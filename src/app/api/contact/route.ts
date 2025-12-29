import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, country, company, message } = body;

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable, fallback to real contact email
    const recipientEmail = process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
    
    // For now, we'll use a simple email format
    // You can integrate with Resend, SendGrid, or other services here
    const emailContent = `
New Contact Form Submission from Miying Website

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Country: ${country || "Not provided"}
Company: ${company}

Message:
${message}

---
Sent from: ${request.headers.get("referer") || "Miying Website"}
    `.trim();

    // Option 1: Use Resend (recommended - free tier: 3,000 emails/month)
    // Uncomment and configure if you have a Resend API key
    /*
    if (process.env.RESEND_API_KEY) {
      const resend = require("resend").default;
      const resendClient = new resend(process.env.RESEND_API_KEY);
      
      await resendClient.emails.send({
        from: "Miying Website <noreply@yourdomain.com>",
        to: recipientEmail,
        subject: "New Contact Form Submission",
        text: emailContent,
      });
    }
    */

    // Option 3: Use SendGrid
    // Uncomment and configure if you have a SendGrid API key
    /*
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: recipientEmail,
        from: "noreply@yourdomain.com",
        subject: "New Contact Form Submission",
        text: emailContent,
      });
    }
    */

    // Option 4: Use Formspree (easiest - no code changes needed)
    // Sign up at formspree.io, get your form endpoint, and set WEBHOOK_URL
    if (process.env.WEBHOOK_URL) {
      const formspreeResponse = await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "",
          country: country || "",
          company,
          message,
          _subject: "New Contact Form Submission from Miying Website",
        }),
      });
      
      if (!formspreeResponse.ok) {
        console.error("Formspree error:", await formspreeResponse.text());
      }
    }

    // For now, log the submission (you'll see this in Vercel logs)
    console.log("Contact form submission:", {
      name,
      email,
      company,
      message: message.substring(0, 50) + "...",
    });

    // TODO: Replace this with actual email sending
    // For production, you MUST set up one of the email services above
    // or use a service like Formspree, EmailJS, etc.

    return NextResponse.json(
      { message: "Thank you! We'll get back to you soon." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

