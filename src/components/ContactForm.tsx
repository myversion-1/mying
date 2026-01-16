"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage } from "./language";
import { validateEmail, validateRequired, validateMinLength, validateFields } from "../lib/form-validation";
import { toast } from "./Toast";
import { trackFormStart, trackFormSubmit, trackFormAbandon } from "../lib/analytics";
import { usePathname } from "next/navigation";

// Simple email sending using mailto as fallback
// For production, set up EmailJS, Resend, or SendGrid
const sendEmail = async (data: {
  name: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
}) => {
  // Option 1: Use API route (current setup - logs to Vercel)
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();

  // Option 2: Use EmailJS (uncomment and configure)
  // You'll need to sign up at emailjs.com and get your service ID, template ID, and public key
  // const emailjs = (await import("@emailjs/browser")).default;
  // return emailjs.send(
  //   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  //   process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  //   {
  //     from_name: data.name,
  //     from_email: data.email,
  //     phone: data.phone,
  //     country: data.country,
  //     company: data.company,
  //     message: data.message,
  //   },
  //   process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
  // );
};

export function ContactForm({ action }: { action?: string }) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(0);

  // Pre-fill message with product name if coming from product page
  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setMessage(`I'm interested in learning more about: ${product}\n\n`);
    }
  }, [searchParams]);

  // Track form start
  useEffect(() => {
    if (!formStarted) {
      trackFormStart({
        formType: "contact",
        page: pathname,
      });
      setFormStarted(true);
    }
  }, [formStarted, pathname]);

  // Track form abandonment on unmount
  useEffect(() => {
    return () => {
      if (formStarted && !isSubmitting) {
        trackFormAbandon({
          formType: "contact",
          fieldsFilled,
          totalFields: 6, // name, email, company, phone, country, message
          page: pathname,
        });
      }
    };
  }, [formStarted, isSubmitting, fieldsFilled, pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const country = (formData.get("country") as string) || "";
    const company = (formData.get("company") as string) || "";
    const messageValue = message || (formData.get("message") as string) || "";

    // Validate form fields - Only essential fields required for B2B follow-up
    const validationResults = validateFields({
      name: validateRequired(name, lang === "zh" ? "姓名" : "Name"),
      email: validateEmail(email),
      company: validateRequired(company, lang === "zh" ? "公司名称" : "Company name"),
      // Message is optional - can be empty or short
      message: messageValue.length > 0 && messageValue.length < 10 
        ? { isValid: false, error: lang === "zh" ? "消息至少需要10个字符" : "Message must be at least 10 characters" }
        : { isValid: true, error: "" },
    });

    if (!validationResults.isValid) {
      setErrors(validationResults.errors);
      setIsSubmitting(false);
      toast.error(lang === "zh" ? "请检查表单错误" : "Please check form errors");
      return;
    }

    const data = {
      name,
      email,
      phone,
      country,
      company,
      message: messageValue,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Track successful form submission
        trackFormSubmit({
          formType: "contact",
          success: true,
          fields: {
            hasPhone: !!phone,
            hasCountry: !!country,
            hasMessage: !!messageValue,
          },
          page: pathname,
        });

        toast.success(result.message || (lang === "zh" ? "感谢您的留言！我们会尽快回复。" : "Thank you! We'll get back to you soon."));
        (e.target as HTMLFormElement).reset();
        setMessage("");
        setErrors({});
        setFieldsFilled(0);
      } else {
        // Track failed form submission
        trackFormSubmit({
          formType: "contact",
          success: false,
          page: pathname,
        });

        toast.error(result.error || (lang === "zh" ? "发送失败，请重试。" : "Failed to send message. Please try again."));
      }
    } catch (error) {
      toast.error(lang === "zh" ? "网络错误，请稍后重试。" : "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-form-type="contact"
      data-form-id="contact-form"
      data-section="contact"
      className="grid gap-4 rounded-2xl border border-[var(--border)] dark-bg-component p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <LabeledInput name="name" label={c.form.name} required error={errors.name} />
        <LabeledInput name="email" label={c.form.email} type="email" required error={errors.email} />
        <LabeledInput name="company" label={c.form.company} required error={errors.company} className="md:col-span-2" />
        <LabeledInput name="phone" label={c.form.phone} error={errors.phone} optional />
        <LabeledInput name="country" label={c.form.country} error={errors.country} optional />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[var(--dark-bg-text-secondary)]" htmlFor="message">
          {c.form.message} <span className="text-[var(--text-tertiary)] text-xs">({lang === "zh" ? "可选" : "Optional"})</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.message;
                return newErrors;
              });
            }
          }}
          className={`w-full rounded-xl border bg-[var(--dark-bg-base)] px-3 py-2 text-[var(--dark-bg-text)] outline-none transition min-h-[44px] touch-manipulation ${
            errors.message
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/20 focus:border-[var(--accent-primary)]/60"
          }`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-md flex items-center gap-2 min-h-[44px] min-w-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
      >
        {isSubmitting && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {isSubmitting 
          ? (lang === "zh" ? "提交中..." : "Sending...") 
          : c.form.submit}
      </button>
    </form>
  );
}

type InputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  className?: string;
};

function LabeledInput({ name, label, type = "text", required, optional, error, className = "" }: InputProps) {
  // Track field interaction for form abandonment analysis
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will be handled by parent component's onChange
    // We can add field-level tracking here if needed
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-[var(--dark-bg-text-secondary)]" htmlFor={name}>
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {optional && <span className="text-[var(--text-tertiary)] text-xs ml-1">(Optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        onChange={handleChange}
        className={`w-full rounded-xl border bg-[var(--dark-bg-base)] px-3 py-2 text-[var(--dark-bg-text)] outline-none transition min-h-[44px] touch-manipulation ${
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/20 focus:border-[var(--accent-primary)]/60"
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

