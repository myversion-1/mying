"use client";

import { copy } from "../content/copy";
import { useLanguage } from "./language";

export function ContactForm({ action }: { action?: string }) {
  const { lang } = useLanguage();
  const c = copy(lang);
  const formAction = action ?? "https://formspree.io/f/mgejvejg";

  return (
    <form
      action={formAction}
      method="POST"
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
      <input type="hidden" name="_subject" value="New lead from Miying website" />
      <button
        type="submit"
        className="w-fit rounded-full bg-[#00eaff] px-5 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)]"
      >
        {c.form.submit}
      </button>
      <p className="text-xs text-white/50">
        The form posts to Formspree; update the endpoint to your preferred inbox.
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

