import { NextRequest, NextResponse } from "next/server";
import { sendEmail, sanitizeInput } from "../../../lib/email";

/**
 * Lead Magnet API Route
 * 
 * Handles form submissions for downloadable assets (product catalog, whitepaper, solution PDF).
 * Sends confirmation email with download link and logs the lead.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, assetId, assetTitle } = body;

    // Validate required fields
    if (!name || !company || !email || !assetId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedCompany = sanitizeInput(company);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedAssetId = sanitizeInput(assetId);
    const sanitizedAssetTitle = sanitizeInput(assetTitle || "");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Get download URL based on asset ID
    const downloadUrls: Record<string, string> = {
      "product-catalog": "/resources/product-catalog-2025.pdf", // Placeholder - replace with actual PDF
      "installation-guide": "/resources/installation-guide.pdf",
      "safety-manual": "/resources/safety-manual.pdf",
      "technical-whitepaper": "/resources/technical-whitepaper.pdf",
      "industry-solution": "/resources/industry-solution-guide.pdf",
    };

    const downloadUrl = downloadUrls[sanitizedAssetId] || "/resources/default.pdf";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   request.headers.get("origin") || 
                   "https://www.miyingrides.com";
    const fullDownloadUrl = `${baseUrl}${downloadUrl}`;

    // Format email content for lead notification
    const emailText = `
New Lead Magnet Download Request

Name: ${sanitizedName}
Company: ${sanitizedCompany}
Email: ${sanitizedEmail}
Asset: ${sanitizedAssetTitle || sanitizedAssetId}

Download URL: ${fullDownloadUrl}

---
Sent from: ${request.headers.get("referer") || "Miying Website"}
Timestamp: ${new Date().toISOString()}
    `.trim();

    const emailHtml = `
<h2>New Lead Magnet Download Request</h2>
<p><strong>Name:</strong> ${sanitizedName}</p>
<p><strong>Company:</strong> ${sanitizedCompany}</p>
<p><strong>Email:</strong> ${sanitizedEmail}</p>
<p><strong>Asset:</strong> ${sanitizedAssetTitle || sanitizedAssetId}</p>
<p><strong>Download URL:</strong> <a href="${fullDownloadUrl}">${fullDownloadUrl}</a></p>
<hr>
<p><small>Sent from: ${request.headers.get("referer") || "Miying Website"}</small></p>
<p><small>Timestamp: ${new Date().toISOString()}</small></p>
    `.trim();

    // Send notification email to admin
    const recipientEmail = process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
    await sendEmail({
      to: recipientEmail,
      subject: `New Lead: ${sanitizedAssetTitle || sanitizedAssetId} Download Request`,
      text: emailText,
      html: emailHtml,
      formData: {
        name: sanitizedName,
        company: sanitizedCompany,
        email: sanitizedEmail,
        assetId: sanitizedAssetId,
        assetTitle: sanitizedAssetTitle,
      },
    });

    // Send confirmation email to user with download link
    const userEmailText = `
Thank you for your interest in ${sanitizedAssetTitle || "our resources"}!

Your download link is ready:
${fullDownloadUrl}

If you have any questions, please don't hesitate to contact us.

Best regards,
Miying Amusement Equipment Team
    `.trim();

    const userEmailHtml = `
<h2>Thank you for your interest!</h2>
<p>Your download link for <strong>${sanitizedAssetTitle || "our resource"}</strong> is ready:</p>
<p><a href="${fullDownloadUrl}" style="display: inline-block; padding: 12px 24px; background-color: #00eaff; color: #0a1628; text-decoration: none; border-radius: 8px; font-weight: 600;">Download Now</a></p>
<p>Or copy this link: <a href="${fullDownloadUrl}">${fullDownloadUrl}</a></p>
<p>If you have any questions, please don't hesitate to contact us.</p>
<p>Best regards,<br>Miying Amusement Equipment Team</p>
    `.trim();

    await sendEmail({
      to: sanitizedEmail,
      subject: `Your Download: ${sanitizedAssetTitle || sanitizedAssetId}`,
      text: userEmailText,
      html: userEmailHtml,
    });

    // Return success with download URL
    return NextResponse.json({
      success: true,
      downloadUrl: fullDownloadUrl,
      message: "Download link sent to your email",
    });
  } catch (error) {
    console.error("Lead magnet API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

