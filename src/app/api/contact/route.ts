import { NextRequest, NextResponse } from "next/server";
import { sendEmail, validateEmail, sanitizeInput } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit-simple";
import { handleError } from "@/lib/errors";
import { createRequestLogger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const logger = createRequestLogger("POST", "/api/contact", request);
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = checkRateLimit(clientId);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          resetTime: rateLimit.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, country, company, message } = body;

    // Validate required fields - Only essential fields for B2B follow-up
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and company are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPhone = phone ? sanitizeInput(phone) : "";
    const sanitizedCountry = country ? sanitizeInput(country) : "";
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedMessage = sanitizeInput(message);

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
    
    // Format email content
    const emailText = `
New Contact Form Submission from Miying Website

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Phone: ${sanitizedPhone || "Not provided"}
Country: ${sanitizedCountry || "Not provided"}
Company: ${sanitizedCompany}

Message:
${sanitizedMessage}

---
Sent from: ${request.headers.get("referer") || "Miying Website"}
Timestamp: ${new Date().toISOString()}
    `.trim();

    const emailHtml = `
<h2>New Contact Form Submission from Miying Website</h2>
<p><strong>Name:</strong> ${sanitizedName}</p>
<p><strong>Email:</strong> ${sanitizedEmail}</p>
<p><strong>Phone:</strong> ${sanitizedPhone || "Not provided"}</p>
<p><strong>Country:</strong> ${sanitizedCountry || "Not provided"}</p>
<p><strong>Company:</strong> ${sanitizedCompany}</p>
<p><strong>Message:</strong></p>
<p>${sanitizedMessage.replace(/\n/g, "<br>")}</p>
<hr>
<p><small>Sent from: ${request.headers.get("referer") || "Miying Website"}</small></p>
<p><small>Timestamp: ${new Date().toISOString()}</small></p>
    `.trim();

    // Send email using the email utility
    // For Formspree, we also send the form fields directly
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: "New Contact Form Submission from Miying Website",
      text: emailText,
      html: emailHtml,
      // Include form data for Formspree compatibility
      formData: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        country: sanitizedCountry,
        company: sanitizedCompany,
        message: sanitizedMessage,
      },
    });

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
      // Still return success to user, but log the error
      // In production, you might want to queue this for retry
    }

    // Log the submission for debugging
    console.log("Contact form submission:", {
      name: sanitizedName,
      email: sanitizedEmail,
      company: sanitizedCompany,
      messageLength: sanitizedMessage.length,
      emailSent: emailResult.success,
      provider: emailResult.provider,
    });

    const response = NextResponse.json(
      { 
        message: "Thank you! We'll get back to you soon.",
        success: true 
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimit.remaining.toString(),
          "X-RateLimit-Reset": rateLimit.resetTime.toString(),
        },
      }
    );
    
    logger.log(200);
    return response;
  } catch (error: unknown) {
    const errorResponse = handleError(error);
    logger.log(errorResponse.statusCode);
    return NextResponse.json(
      { error: errorResponse.message },
      { status: errorResponse.statusCode }
    );
  }
}

