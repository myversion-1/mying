import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, product, quantity, message } = body;

    // Validate required fields
    if (!name || !email || !company || !product || !quantity || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate quantity
    if (isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    // Get recipient email from environment variable
    const recipientEmail = process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
    
    // Format email content
    const emailContent = `
New Quote Request from Miying Website

Name: ${name}
Work Email: ${email}
Company: ${company}
Product of Interest: ${product}
Order Quantity: ${quantity}

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
        subject: `New Quote Request: ${product} (Quantity: ${quantity})`,
        text: emailContent,
      });
    }
    */

    // Option 2: Use Formspree (easiest - no code changes needed)
    // Sign up at formspree.io, get your form endpoint, and set WEBHOOK_URL
    if (process.env.WEBHOOK_URL) {
      const formspreeResponse = await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          product,
          quantity,
          message,
          _subject: `New Quote Request: ${product} (Quantity: ${quantity})`,
        }),
      });
      
      if (!formspreeResponse.ok) {
        console.error("Formspree error:", await formspreeResponse.text());
      }
    }

    // Option 3: Use SendGrid
    // Uncomment and configure if you have a SendGrid API key
    /*
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: recipientEmail,
        from: "noreply@yourdomain.com",
        subject: `New Quote Request: ${product} (Quantity: ${quantity})`,
        text: emailContent,
      });
    }
    */

    // For now, log the submission (you'll see this in Vercel logs)
    console.log("Quote Request Submission:", {
      name,
      email,
      company,
      product,
      quantity,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote request submitted successfully. We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


