/**
 * Email sending utility
 * Supports multiple email providers: Resend, SendGrid, and Webhook (Formspree)
 */

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html?: string;
  from?: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
  provider?: string;
}

/**
 * Send email using available providers (Resend > SendGrid > Webhook)
 */
export async function sendEmail(data: EmailData): Promise<EmailResult> {
  const recipientEmail = data.to || process.env.CONTACT_EMAIL || "miyingyoule@gmail.com";
  const fromEmail = data.from || process.env.FROM_EMAIL || "Miying Website <noreply@mying.com>";
  
  // Try Resend first (recommended)
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const result = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        subject: data.subject,
        text: data.text,
        html: data.html || data.text.replace(/\n/g, "<br>"),
      });

      if (result.error) {
        console.error("Resend error:", result.error);
        // Fall through to next provider
      } else {
        console.log("Email sent via Resend:", result.data?.id);
        return { success: true, provider: "resend" };
      }
    } catch (error) {
      console.error("Resend send error:", error);
      // Fall through to next provider
    }
  }

  // Try SendGrid
  if (process.env.SENDGRID_API_KEY) {
    try {
      // Dynamic import with error handling for optional dependency
      let sgMail;
      try {
        sgMail = (await import("@sendgrid/mail")).default;
      } catch (importError) {
        // @sendgrid/mail is optional, skip if not installed
        throw new Error("SendGrid package not installed");
      }
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      
      await sgMail.send({
        to: recipientEmail,
        from: fromEmail,
        subject: data.subject,
        text: data.text,
        html: data.html || data.text.replace(/\n/g, "<br>"),
      });

      console.log("Email sent via SendGrid");
      return { success: true, provider: "sendgrid" };
    } catch (error: unknown) {
      console.error("SendGrid error:", error);
      // Fall through to next provider
    }
  }

  // Try Webhook (Formspree, etc.)
  if (process.env.WEBHOOK_URL) {
    try {
      // Check if it's a Formspree URL (formspree.io)
      const isFormspree = process.env.WEBHOOK_URL.includes('formspree.io');
      
      let requestBody: Record<string, unknown>;
      let headers: Record<string, string> = { "Content-Type": "application/json" };

      if (isFormspree) {
        // Formspree expects form fields or JSON with _subject
        // Use formData if provided, otherwise use the formatted text
        if (data.formData) {
          requestBody = {
            _subject: data.subject,
            ...data.formData,
          };
        } else {
          requestBody = {
            _subject: data.subject,
            message: data.text,
            _html: data.html || data.text.replace(/\n/g, "<br>"),
          };
        }
      } else {
        // Generic webhook format
        requestBody = {
          to: recipientEmail,
          subject: data.subject,
          text: data.text,
          html: data.html,
        };
      }

      const response = await fetch(process.env.WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log("Email sent via Webhook", isFormspree ? "(Formspree)" : "");
        return { success: true, provider: "webhook" };
      } else {
        const errorText = await response.text();
        console.error("Webhook error:", errorText);
        return { success: false, error: `Webhook error: ${errorText}`, provider: "webhook" };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Webhook send error:", error);
      return { success: false, error: errorMessage, provider: "webhook" };
    }
  }

  // No email provider configured - log for development
  console.warn("No email provider configured. Email would have been sent to:", recipientEmail);
  console.warn("Email content:", data.subject);
  console.warn("Set RESEND_API_KEY, SENDGRID_API_KEY, or WEBHOOK_URL to enable email sending.");

  // In development, we still return success so forms work
  // In production, this should be an error
  if (process.env.NODE_ENV === "development") {
    return { success: true, provider: "console" };
  }

  return {
    success: false,
    error: "No email provider configured. Please set RESEND_API_KEY, SENDGRID_API_KEY, or WEBHOOK_URL.",
  };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

