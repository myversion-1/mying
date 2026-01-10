import { NextRequest, NextResponse } from "next/server";
import { sendEmail, validateEmail, sanitizeInput } from "@/lib/email";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit-simple";
import { handleError } from "@/lib/errors";
import { createRequestLogger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const logger = createRequestLogger("POST", "/api/quote", request);
  
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
    const { name, email, company, product, quantity, message } = body;

    // Validate required fields - Message is optional
    if (!name || !email || !company || !product || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, company, product, and quantity are required" },
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

    // Validate quantity
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0 || !Number.isInteger(quantityNum)) {
      return NextResponse.json(
        { error: "Invalid quantity. Must be a positive integer." },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedProduct = sanitizeInput(product);
    const sanitizedMessage = sanitizeInput(message);

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
    
    // Format email content
    const emailText = `
New Quote Request from Miying Website

Name: ${sanitizedName}
Work Email: ${sanitizedEmail}
Company: ${sanitizedCompany}
Product of Interest: ${sanitizedProduct}
Order Quantity: ${quantityNum}

Message:
${sanitizedMessage}

---
Sent from: ${request.headers.get("referer") || "Miying Website"}
Timestamp: ${new Date().toISOString()}
    `.trim();

    const emailHtml = `
<h2>New Quote Request from Miying Website</h2>
<p><strong>Name:</strong> ${sanitizedName}</p>
<p><strong>Work Email:</strong> ${sanitizedEmail}</p>
<p><strong>Company:</strong> ${sanitizedCompany}</p>
<p><strong>Product of Interest:</strong> ${sanitizedProduct}</p>
<p><strong>Order Quantity:</strong> ${quantityNum}</p>
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
      subject: `New Quote Request: ${sanitizedProduct} (Quantity: ${quantityNum})`,
      text: emailText,
      html: emailHtml,
      // Include form data for Formspree compatibility
      formData: {
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        product: sanitizedProduct,
        quantity: quantityNum.toString(),
        message: sanitizedMessage,
      },
    });

    if (!emailResult.success) {
      console.error("Email sending failed:", emailResult.error);
      // Still return success to user, but log the error
      // In production, you might want to queue this for retry
    }

    // Log the submission for debugging
    console.log("Quote Request Submission:", {
      name: sanitizedName,
      email: sanitizedEmail,
      company: sanitizedCompany,
      product: sanitizedProduct,
      quantity: quantityNum,
      messageLength: sanitizedMessage.length,
      emailSent: emailResult.success,
      provider: emailResult.provider,
      timestamp: new Date().toISOString(),
    });

    const response = NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully. We'll get back to you within 24 hours.",
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






