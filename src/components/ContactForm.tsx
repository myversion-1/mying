"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage } from "./language";
import { validateEmail, validateRequired, validateMinLength, validateFields } from "../lib/form-validation";
import { toast } from "./Toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  // Pre-fill message with product name if coming from product page
  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setMessage(`I'm interested in learning more about: ${product}\n\n`);
    }
  }, [searchParams]);

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

    // Validate form fields
    const validationResults = validateFields({
      name: validateRequired(name, lang === "zh" ? "姓名" : "Name"),
      email: validateEmail(email),
      company: validateRequired(company, lang === "zh" ? "公司名称" : "Company name"),
      message: validateMinLength(messageValue, 10, lang === "zh" ? "消息" : "Message"),
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
        toast.success(result.message || (lang === "zh" ? "感谢您的留言！我们会尽快回复。" : "Thank you! We'll get back to you soon."));
        (e.target as HTMLFormElement).reset();
        setMessage("");
        setErrors({});
      } else {
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
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <LabeledInput name="name" label={c.form.name} required error={errors.name} />
        <LabeledInput name="email" label={c.form.email} type="email" required error={errors.email} />
        <LabeledInput name="phone" label={c.form.phone} error={errors.phone} />
        <LabeledInput name="country" label={c.form.country} error={errors.country} />
        <LabeledInput name="company" label={c.form.company} required error={errors.company} />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80" htmlFor="message">
          {c.form.message}
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
          className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
            errors.message
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/10 focus:border-[#7df6ff]/60"
          }`}
          required
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
        className="w-fit rounded-full bg-[#00eaff] px-5 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
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
        {isSubmitting ? "Sending..." : c.form.submit}
      </button>
      <p className="text-xs text-white/50">
        We'll respond to your inquiry within 24 hours.
      </p>
    </form>
  );
}

type InputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
};

function LabeledInput({ name, label, type = "text", required, error }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/80" htmlFor={name}>
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-[#7df6ff]/60"
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

