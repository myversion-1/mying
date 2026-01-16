"use client";

import { useState } from "react";
import { useLanguage } from "./language";

interface CADDownloadFormProps {
  productName: string;
  onClose: () => void;
}

/**
 * CAD/BIM Download Lead Capture Form
 * Simple form to collect name, company, and email before downloading CAD/BIM files
 */
export function CADDownloadForm({ productName, onClose }: CADDownloadFormProps) {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - replace with actual API endpoint
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Here you would send the data to your backend
      // await fetch('/api/cad-download', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, productName }),
      // });

      setIsSubmitted(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className="relative max-w-md w-full bg-[var(--dark-bg-base)] rounded-2xl border border-white/10 p-6 md:p-8 transition-opacity">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--dark-bg-text-secondary)] hover:text-[var(--dark-bg-text)] transition-colors min-h-[44px] min-w-[44px] touch-manipulation"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {isSubmitted ? (
            <div className="text-center transition-opacity">
              <div className="mb-4 flex justify-center">
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
              <h3 className="text-xl font-semibold text-white mb-2">
                {lang === "zh" ? "提交成功！" : "Success!"}
              </h3>
              <p className="text-[var(--dark-bg-text-secondary)]">
                {lang === "zh"
                  ? "CAD/BIM 文件下载链接已发送至您的邮箱"
                  : "CAD/BIM download link has been sent to your email"}
              </p>
            </div>
          ) : (
            <div className="transition-opacity">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {lang === "zh" ? "下载 CAD/BIM 模型文件" : "Download CAD/BIM Files"}
                </h3>
                <p className="text-[var(--dark-bg-text-secondary)] text-sm">
                  {lang === "zh"
                    ? `请填写以下信息以下载 ${productName} 的 CAD/BIM 模型文件`
                    : `Please fill in the following information to download CAD/BIM files for ${productName}`}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--dark-bg-text)] mb-2"
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
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-[var(--dark-bg-text)] placeholder:text-[var(--dark-bg-text-tertiary)] focus:border-[var(--accent-primary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                    placeholder={lang === "zh" ? "请输入您的姓名" : "Enter your name"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-[var(--dark-bg-text)] mb-2"
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
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-[var(--dark-bg-text)] placeholder:text-[var(--dark-bg-text-tertiary)] focus:border-[var(--accent-primary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                    placeholder={lang === "zh" ? "请输入公司名称" : "Enter company name"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--dark-bg-text)] mb-2"
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
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-[var(--dark-bg-text)] placeholder:text-[var(--dark-bg-text-tertiary)] focus:border-[var(--accent-primary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                    placeholder={lang === "zh" ? "请输入邮箱地址" : "Enter email address"}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-[var(--dark-bg-text-secondary)] hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] touch-manipulation"
                  >
                    {lang === "zh" ? "取消" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-5 py-3 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-md min-h-[44px] min-w-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
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
              </form>
            </div>
          )}
      </div>
    </div>
  );
}



