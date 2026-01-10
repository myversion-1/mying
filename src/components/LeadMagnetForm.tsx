"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language";
import { validateEmail, validateRequired, validateFields } from "../lib/form-validation";
import { toast } from "./Toast";
import { trackFormStart, trackFormSubmit, trackFormAbandon } from "../lib/analytics";

type LeadMagnetAsset = {
  id: string;
  title: string;
  description: string;
  downloadUrl: string;
  fileType: "PDF" | "DOC" | "XLS";
};

interface LeadMagnetFormProps {
  asset: LeadMagnetAsset;
  onSuccess?: (downloadUrl: string) => void;
  onClose?: () => void;
}

/**
 * Lead Magnet Form Component
 * 
 * Lightweight form gating downloadable assets (product catalog, whitepaper, solution PDF).
 * Only requests essential fields: name, company, email.
 * 
 * Non-aggressive sales approach - immediate access after submission.
 */
export function LeadMagnetForm({ asset, onSuccess, onClose }: LeadMagnetFormProps) {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStarted, setFormStarted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form fields
    const validationResults = validateFields({
      name: validateRequired(formData.name, lang === "zh" ? "姓名" : "Name"),
      company: validateRequired(formData.company, lang === "zh" ? "公司名称" : "Company name"),
      email: validateEmail(formData.email),
    });

    if (!validationResults.isValid) {
      setErrors(validationResults.errors);
      toast.error(lang === "zh" ? "请检查表单错误" : "Please check form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form data to API
      const response = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          assetId: asset.id,
          assetTitle: asset.title,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Track successful form submission
      trackFormSubmit({
        formType: "lead_magnet",
        formId: asset.id,
        success: true,
        fields: {
          assetId: asset.id,
          assetTitle: asset.title,
        },
        page: pathname,
      });

      // Success - provide immediate download access
      setIsSubmitted(true);
      setDownloadUrl(asset.downloadUrl);
      
      // Trigger download immediately
      if (asset.downloadUrl) {
        window.open(asset.downloadUrl, "_blank");
      }

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(asset.downloadUrl);
      }

      toast.success(
        lang === "zh" 
          ? "下载链接已准备就绪！" 
          : "Download link ready!"
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Track failed form submission
      trackFormSubmit({
        formType: "lead_magnet",
        formId: asset.id,
        success: false,
        page: pathname,
      });

      toast.error(
        lang === "zh" 
          ? "提交失败，请稍后重试" 
          : "Submission failed, please try again"
      );
      setIsSubmitting(false);
    }
  };

  // Track form start
  useEffect(() => {
    if (!formStarted) {
      trackFormStart({
        formType: "lead_magnet",
        formId: asset.id,
        page: pathname,
      });
      setFormStarted(true);
    }
  }, [formStarted, pathname, asset.id]);

  // Track form abandonment on unmount
  useEffect(() => {
    return () => {
      if (formStarted && !isSubmitting && !isSubmitted) {
        const fieldsFilled = Object.values(formData).filter(v => v && v.trim() !== "").length;
        trackFormAbandon({
          formType: "lead_magnet",
          formId: asset.id,
          fieldsFilled,
          totalFields: 3, // name, company, email
          page: pathname,
        });
      }
    };
  }, [formStarted, isSubmitting, isSubmitted, formData, pathname, asset.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    }
  };

  // Success state - show download confirmation
  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-primary-light)]">
            <svg
              className="h-8 w-8 text-[var(--accent-primary)]"
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
        <h3 className="mb-2 text-2xl font-semibold text-[var(--text-primary)]">
          {lang === "zh" ? "下载准备就绪！" : "Download Ready!"}
        </h3>
        <p className="mb-6 text-[var(--text-secondary)]">
          {lang === "zh"
            ? `感谢您的提交。${asset.title} 的下载链接已发送至您的邮箱。`
            : `Thank you for your submission. The download link for ${asset.title} has been sent to your email.`}
        </p>
        {downloadUrl && (
          <div className="space-y-4">
            <button
              onClick={handleDownload}
              className="w-full rounded-lg bg-[var(--action-primary)] px-8 py-4 text-base font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
            >
              {lang === "zh" ? "立即下载" : "Download Now"}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-full rounded-lg border border-[var(--action-secondary-border)] bg-[var(--action-secondary)] px-8 py-3 text-sm font-semibold text-[var(--action-secondary-text)] transition-colors hover:bg-[var(--action-secondary-hover-bg)] min-h-[44px] touch-manipulation"
              >
                {lang === "zh" ? "关闭" : "Close"}
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Form state
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8">
      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-semibold text-[var(--text-primary)]">
          {lang === "zh" ? "获取下载链接" : "Get Download Link"}
        </h3>
        <p className="text-[var(--text-secondary)]">
          {lang === "zh"
            ? `请填写以下信息以下载 ${asset.title}`
            : `Please fill in the following information to download ${asset.title}`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            {lang === "zh" ? "姓名" : "Name"} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 min-h-[44px] touch-manipulation ${
              errors.name
                ? "border-[var(--action-risk)] focus:ring-[var(--action-risk)]/20"
                : "border-[var(--border)] bg-[var(--surface)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20"
            }`}
            placeholder={lang === "zh" ? "请输入您的姓名" : "Enter your name"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-[var(--action-risk)]">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            {lang === "zh" ? "公司" : "Company"} *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 min-h-[44px] touch-manipulation ${
              errors.company
                ? "border-[var(--action-risk)] focus:ring-[var(--action-risk)]/20"
                : "border-[var(--border)] bg-[var(--surface)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20"
            }`}
            placeholder={lang === "zh" ? "请输入公司名称" : "Enter company name"}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-[var(--action-risk)]">{errors.company}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            {lang === "zh" ? "邮箱" : "Email"} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 min-h-[44px] touch-manipulation ${
              errors.email
                ? "border-[var(--action-risk)] focus:ring-[var(--action-risk)]/20"
                : "border-[var(--border)] bg-[var(--surface)] focus:border-[var(--accent-primary)] focus:ring-[var(--accent-primary)]/20"
            }`}
            placeholder={lang === "zh" ? "请输入邮箱地址" : "Enter email address"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-[var(--action-risk)]">{errors.email}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[var(--action-primary)] px-8 py-4 text-base font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
          >
            {isSubmitting
              ? lang === "zh"
                ? "提交中..."
                : "Submitting..."
              : lang === "zh"
              ? "获取下载链接"
              : "Get Download Link"}
          </button>
        </div>

        <p className="text-xs text-center text-[var(--text-tertiary)]">
          {lang === "zh"
            ? "提交后，下载链接将立即发送至您的邮箱"
            : "After submission, the download link will be sent to your email immediately"}
        </p>
      </form>
    </div>
  );
}

