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

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || "your-email@example.com";
    
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

    // Option 2: Use Gmail SMTP (simple, no API needed)
    // Uncomment and configure if you want to use Gmail
    /*
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      const nodemailer = require("nodemailer");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
        },
      });
      
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
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

