"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { copy } from "../content/copy";
import { useLanguage } from "./language";
import { getProducts } from "../content/copy";
import { validateEmail, validateWorkEmail, validateRequired, validateNumber, validateMinLength, validateFields, isWorkEmail } from "../lib/form-validation";
import { toast } from "./Toast";
import { trackFormStart, trackFormSubmit, trackFormAbandon } from "../lib/analytics";
import { usePathname } from "next/navigation";

export function QuoteForm() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | null; message: string }>({ type: null, message: "" });
  const [formStarted, setFormStarted] = useState(false);

  // Pre-fill product if coming from product page
  useEffect(() => {
    const product = searchParams.get("product");
    if (product) {
      setFormData((prev) => ({ ...prev, product: decodeURIComponent(product) }));
    }
  }, [searchParams]);

  // Track form start
  useEffect(() => {
    if (!formStarted) {
      trackFormStart({
        formType: "quote",
        page: pathname,
      });
      setFormStarted(true);
    }
  }, [formStarted, pathname]);

  // Track form abandonment on unmount
  useEffect(() => {
    return () => {
      if (formStarted && !isSubmitting && submitStatus.type !== "success") {
        const fieldsFilled = Object.values(formData).filter(v => v && v.trim() !== "").length;
        trackFormAbandon({
          formType: "quote",
          fieldsFilled,
          totalFields: 6, // name, email, company, product, quantity, message
          page: pathname,
        });
      }
    };
  }, [formStarted, isSubmitting, submitStatus.type, formData, pathname]);

  const validateForm = (): boolean => {
    const fieldLabels = {
      name: lang === "zh" ? "姓名" : "Name",
      email: lang === "zh" ? "工作邮箱" : "Work email",
      company: lang === "zh" ? "公司名称" : "Company name",
      product: lang === "zh" ? "产品" : "Product",
      quantity: lang === "zh" ? "订购数量" : "Order quantity",
      message: lang === "zh" ? "消息" : "Message",
    };

    const validationResults = validateFields({
      name: validateRequired(formData.name, fieldLabels.name),
      email: validateWorkEmail(formData.email, false), // Not strict, just warning
      company: validateRequired(formData.company, fieldLabels.company),
      product: validateRequired(formData.product, fieldLabels.product),
      quantity: validateNumber(formData.quantity, {
        min: 1,
        integer: true,
        required: true,
        fieldName: fieldLabels.quantity,
      }),
      // Message is optional for quote requests
      message: formData.message.length > 0 && formData.message.length < 10
        ? { isValid: false, error: lang === "zh" ? "消息至少需要10个字符" : "Message must be at least 10 characters" }
        : { isValid: true, error: "" },
    });

    setErrors(validationResults.errors);
    return validationResults.isValid;
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
        // Track successful form submission
        trackFormSubmit({
          formType: "quote",
          success: true,
          fields: {
            hasProduct: !!formData.product,
            hasQuantity: !!formData.quantity,
            hasMessage: !!formData.message,
            quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
          },
          page: pathname,
        });

        const successMessage = result.message || 
          (lang === "zh" 
            ? "报价请求已提交成功！我们会在24小时内回复您。" 
            : "Quote request submitted successfully. We'll get back to you within 24 hours.");
        toast.success(successMessage);
        setSubmitStatus({ type: "success", message: successMessage });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          product: "",
          quantity: "",
          message: "",
        });
        setErrors({});
      } else {
        // Track failed form submission
        trackFormSubmit({
          formType: "quote",
          success: false,
          page: pathname,
        });

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
      data-form-type="quote"
      data-form-id="quote-form"
      data-section="quote"
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
          {lang === "zh" ? "消息" : "Message"} <span className="text-white/50 text-xs">({lang === "zh" ? "可选" : "Optional"})</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`w-full rounded-xl border bg-[var(--dark-bg-base)] px-3 py-2 text-[var(--dark-bg-text)] outline-none transition min-h-[44px] touch-manipulation ${
            errors.message
              ? "border-red-500/50 focus:border-red-500"
              : "border-white/10 focus:border-[var(--accent-secondary)]/60"
          }`}
          placeholder={lang === "zh" ? "项目详情、特殊要求或其他信息（可选）" : "Project details, special requirements, or other information (optional)"}
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
      </div>


      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--action-primary)] px-6 py-3 text-sm font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] touch-manipulation"
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

    </form>
  );
}

