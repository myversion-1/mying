"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./language";
import { copy } from "../content/copy";
import { validateRequired, validateWorkEmail, validateNumber, validateFields, isWorkEmail } from "../lib/form-validation";
import { toast } from "./Toast";

interface QuickQuoteFormProps {
  productName: string;
  className?: string;
}

/**
 * Quick Quote Form Component
 * Lightweight quote request form for product pages
 * Optimized for conversion with minimal fields
 */
export function QuickQuoteForm({ productName, className = "" }: QuickQuoteFormProps) {
  const { lang } = useLanguage();
  const c = copy(lang);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "",
    openingDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-fill product name in message
  const message = `I'm interested in getting a quote for: ${productName}${formData.quantity ? ` (Quantity: ${formData.quantity})` : ""}${formData.openingDate ? `\nTarget opening date: ${formData.openingDate}` : ""}`;

  const validateForm = (): boolean => {
    const fieldLabels = {
      name: lang === "zh" ? "姓名" : "Name",
      email: lang === "zh" ? "工作邮箱" : "Work email",
      company: lang === "zh" ? "公司名称" : "Company name",
      quantity: lang === "zh" ? "数量" : "Quantity",
    };

    const validationResults = validateFields({
      name: validateRequired(formData.name, fieldLabels.name),
      email: validateWorkEmail(formData.email, false), // Not strict, just warning
      company: validateRequired(formData.company, fieldLabels.company),
      quantity: validateNumber(formData.quantity, {
        min: 1,
        integer: true,
        required: true,
        fieldName: fieldLabels.quantity,
      }),
    });

    setErrors(validationResults.errors);
    return validationResults.isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(lang === "zh" ? "请检查表单错误" : "Please check form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          product: productName,
          quantity: formData.quantity,
          message: message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const successMessage = result.message || 
          (lang === "zh" 
            ? "询价请求已提交成功！我们会在24小时内回复您。" 
            : "Quote request submitted successfully. We'll get back to you within 24 hours.");
        toast.success(successMessage);
        setIsSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          quantity: "",
          openingDate: "",
        });
        setErrors({});
      } else {
        toast.error(
          result.error || 
          (lang === "zh" ? "提交失败，请重试。" : "Failed to submit quote request. Please try again.")
        );
      }
    } catch (error) {
      toast.error(lang === "zh" ? "网络错误，请稍后重试。" : "Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSuccess) {
    return (
      <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 ${className}`}>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
            {lang === "zh" ? "感谢您的询价！" : "Thank You!"}
          </h3>
          <p className="mb-4 text-sm text-[var(--text-secondary)]">
            {lang === "zh" 
              ? "我们会在24小时内回复您。" 
              : "We'll get back to you within 24 hours."}
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-hover)] min-h-[44px] touch-manipulation"
          >
            {lang === "zh" ? "提交新的询价" : "Submit Another Request"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {lang === "zh" ? "快速询价" : "Quick Quote"}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {lang === "zh" 
            ? "填写以下信息，我们会在24小时内回复您" 
            : "Fill in the form and we'll respond within 24 hours"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Read-only, pre-filled) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "产品" : "Product"}
          </label>
          <input
            type="text"
            value={productName}
            disabled
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-secondary)] cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "姓名" : "Name"} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition min-h-[44px] touch-manipulation ${
              errors.name
                ? "border-red-500/50 focus:border-red-500"
                : "border-[var(--border)] focus:border-[var(--accent-primary)]"
            }`}
            placeholder={lang === "zh" ? "您的姓名" : "Your name"}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "工作邮箱" : "Work Email"} <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition min-h-[44px] touch-manipulation ${
              errors.email
                ? "border-red-500/50 focus:border-red-500"
                : "border-[var(--border)] focus:border-[var(--accent-primary)]"
            }`}
            placeholder={lang === "zh" ? "yourname@company.com" : "yourname@company.com"}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          {formData.email && !errors.email && !isWorkEmail(formData.email) && (
            <p className="mt-1 text-xs text-amber-400">
              {lang === "zh" ? "建议使用公司邮箱" : "Work email recommended"}
            </p>
          )}
        </div>

        {/* Company */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "公司名称" : "Company Name"} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className={`w-full rounded-lg border bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition min-h-[44px] touch-manipulation ${
              errors.company
                ? "border-red-500/50 focus:border-red-500"
                : "border-[var(--border)] focus:border-[var(--accent-primary)]"
            }`}
            placeholder={lang === "zh" ? "您的公司名称" : "Your company name"}
          />
          {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "数量" : "Quantity"} <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="1"
            className={`w-full rounded-lg border bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition min-h-[44px] touch-manipulation ${
              errors.quantity
                ? "border-red-500/50 focus:border-red-500"
                : "border-[var(--border)] focus:border-[var(--accent-primary)]"
            }`}
            placeholder={lang === "zh" ? "1" : "1"}
          />
          {errors.quantity && <p className="mt-1 text-xs text-red-400">{errors.quantity}</p>}
        </div>

        {/* Opening Date (Optional) */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "预计开业时间" : "Target Opening Date"} <span className="text-[var(--text-tertiary)]">({lang === "zh" ? "可选" : "Optional"})</span>
          </label>
          <input
            type="date"
            name="openingDate"
            value={formData.openingDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50 transition min-h-[44px] touch-manipulation"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-[var(--action-primary)] px-6 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
        >
          {isSubmitting 
            ? (lang === "zh" ? "提交中..." : "Submitting...") 
            : (lang === "zh" ? "获取报价" : "Get Quote")}
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-[var(--text-tertiary)] text-center">
          {lang === "zh" 
            ? "提交即表示您同意我们的隐私政策" 
            : "By submitting, you agree to our privacy policy"}
        </p>
      </form>
    </div>
  );
}



