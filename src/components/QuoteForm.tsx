"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage } from "./language";
import { getProducts } from "../content/copy";

// Email validation function
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Work email validation (should not be common personal email domains)
const isWorkEmail = (email: string): boolean => {
  const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'mail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  return domain ? !personalDomains.includes(domain) : false;
};

export function QuoteForm() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const searchParams = useSearchParams();
  const products = getProducts(lang);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    product: "",
    quantity: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Pre-fill product if coming from product page
  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setFormData((prev) => ({ ...prev, product: decodeURIComponent(product) }));
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === "zh" ? "请输入姓名" : "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = lang === "zh" ? "请输入工作邮箱" : "Work email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = lang === "zh" ? "请输入有效的邮箱地址" : "Please enter a valid email address";
    } else if (!isWorkEmail(formData.email)) {
      // Warning but not blocking - just a suggestion
      // You can make this stricter if needed
    }

    if (!formData.company.trim()) {
      newErrors.company = lang === "zh" ? "请输入公司名称" : "Company name is required";
    }

    if (!formData.product.trim()) {
      newErrors.product = lang === "zh" ? "请选择感兴趣的产品" : "Please select a product of interest";
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = lang === "zh" ? "请输入订购数量" : "Order quantity is required";
    } else if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = lang === "zh" ? "请输入有效的数量" : "Please enter a valid quantity";
    }

    if (!formData.message.trim()) {
      newErrors.message = lang === "zh" ? "请输入消息" : "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: lang === "zh" 
            ? "感谢您的询价！我们将在24小时内回复您。" 
            : "Thank you for your quote request! We'll get back to you within 24 hours.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          product: "",
          quantity: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || (lang === "zh" ? "提交失败，请重试。" : "Failed to submit. Please try again."),
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: lang === "zh" ? "网络错误，请稍后重试。" : "Network error. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (submitStatus.type === "success") {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5 p-8 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-8 w-8 text-green-400"
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
        <h3 className="mb-2 text-xl font-semibold text-white">
          {lang === "zh" ? "感谢您的询价！" : "Thank You!"}
        </h3>
        <p className="mb-6 text-white/80">{submitStatus.message}</p>
        <button
          onClick={() => setSubmitStatus({ type: null, message: "" })}
          className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {lang === "zh" ? "提交新的询价" : "Submit Another Request"}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80" htmlFor="name">
            {lang === "zh" ? "姓名" : "Name"} <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
              errors.name
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-[#7df6ff]/60"
            }`}
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80" htmlFor="email">
            {lang === "zh" ? "工作邮箱" : "Work Email"} <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
              errors.email
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-[#7df6ff]/60"
            }`}
            placeholder={lang === "zh" ? "yourname@company.com" : "yourname@company.com"}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          {formData.email && !errors.email && !isWorkEmail(formData.email) && (
            <p className="text-xs text-amber-400">
              {lang === "zh" ? "建议使用公司邮箱" : "Work email recommended"}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80" htmlFor="company">
            {lang === "zh" ? "公司名称" : "Company Name"} <span className="text-red-400">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
              errors.company
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-[#7df6ff]/60"
            }`}
          />
          {errors.company && <p className="text-xs text-red-400">{errors.company}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80" htmlFor="product">
            {lang === "zh" ? "感兴趣的产品" : "Product of Interest"} <span className="text-red-400">*</span>
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
              errors.product
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-[#7df6ff]/60"
            }`}
          >
            <option value="">{lang === "zh" ? "请选择产品" : "Select a product..."}</option>
            {products.map((product, index) => (
              <option key={`${product.name}-${index}`} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.product && <p className="text-xs text-red-400">{errors.product}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80" htmlFor="quantity">
            {lang === "zh" ? "订购数量" : "Order Quantity"} <span className="text-red-400">*</span>
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
              errors.quantity
                ? "border-red-500/50 focus:border-red-500"
                : "border-white/10 focus:border-[#7df6ff]/60"
            }`}
            placeholder={lang === "zh" ? "例如: 5" : "e.g., 5"}
          />
          {errors.quantity && <p className="text-xs text-red-400">{errors.quantity}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-white/80" htmlFor="message">
          {lang === "zh" ? "消息" : "Message"} <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-[#0c1014] px-3 py-2 text-white outline-none transition ${
            errors.message
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/10 focus:border-[#7df6ff]/60"
          }`}
          placeholder={lang === "zh" ? "请提供项目详情、特殊要求或其他信息..." : "Please provide project details, special requirements, or any other information..."}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
      </div>

      {submitStatus.type === "error" && (
        <div className="rounded-xl border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-400">
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#00eaff] px-6 py-3 text-sm font-semibold text-[#0b1116] shadow-[0_0_28px_rgba(0,234,255,0.35)] transition hover:-translate-y-[1px] hover:shadow-[0_0_36px_rgba(0,234,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
      >
        {isSubmitting && (
          <svg
            className="h-4 w-4 animate-spin"
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
          ? lang === "zh"
            ? "提交中..."
            : "Submitting..."
          : lang === "zh"
          ? "提交询价"
          : "Request Quote"}
      </button>

      <p className="text-xs text-white/50 text-center">
        {lang === "zh"
          ? "我们将在24小时内回复您的询价。"
          : "We'll respond to your quote request within 24 hours."}
      </p>
    </form>
  );
}

