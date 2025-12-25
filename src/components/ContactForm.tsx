"use client";

import { useState } from "react";
import { copy } from "../content/copy";
import { useLanguage } from "./language";

export function ContactForm({ action }: { action?: string }) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      company: formData.get("company"),
      message: formData.get("message"),
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
        setSubmitStatus({
          type: "success",
          message: result.message || "Thank you! We'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again later.",
      });
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
        <LabeledInput name="name" label={c.form.name} required />
        <LabeledInput name="email" label={c.form.email} type="email" required />
        <LabeledInput name="phone" label={c.form.phone} />
        <LabeledInput name="country" label={c.form.country} />
        <LabeledInput name="company" label={c.form.company} required />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80">
          {c.form.message}
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-xl border border-white/10 bg-[#0c1014] px-3 py-2 text-white outline-none transition focus:border-[#7df6ff]/60"
          required
        />
      </div>
      {submitStatus.type && (
        <div
          className={`rounded-xl border p-3 text-sm ${
            submitStatus.type === "success"
              ? "border-green-500/50 bg-green-500/10 text-green-400"
              : "border-red-500/50 bg-red-500/10 text-red-400"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-full bg-[#00eaff] px-5 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : c.form.submit}
      </button>
      <p className="text-xs text-white/50">
        Set CONTACT_EMAIL environment variable in Vercel to receive submissions.
      </p>
    </form>
  );
}

type InputProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
};

function LabeledInput({ name, label, type = "text", required }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-white/80" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-[#0c1014] px-3 py-2 text-white outline-none transition focus:border-[#7df6ff]/60"
      />
    </div>
  );
}

