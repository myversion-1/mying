"use client";

import { useState } from "react";
import { useLanguage } from "../language";

interface SpatialAuditFormProps {
  onSubmit?: (data: FormData) => void;
}

export function SpatialAuditForm({ onSubmit }: SpatialAuditFormProps) {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    venueType: "",
    ceilingHeight: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (onSubmit) {
      onSubmit(data);
    } else {
      // Default: redirect to contact page with pre-filled data
      window.location.href = `/contact?subject=Spatial Audit Request&venueType=${encodeURIComponent(formData.venueType)}&ceilingHeight=${encodeURIComponent(formData.ceilingHeight)}`;
    }
  };

  return (
    <div className="spatial-audit-form my-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 md:p-12">
      <h3 className="mb-4 font-serif text-2xl font-semibold text-[var(--text-primary)] md:text-3xl">
        {lang === "zh" ? "申请场地空间审计" : "Request a Spatial Audit for Your Venue"}
      </h3>
      <p className="mb-6 text-[var(--text-secondary)]">
        {lang === "zh"
          ? "我们的专家团队将评估您的场地，提供定制化的边角空间优化方案。"
          : "Our expert team will evaluate your venue and provide a customized corner space optimization solution."}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {lang === "zh" ? "姓名" : "Name"} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
              placeholder={lang === "zh" ? "您的姓名" : "Your name"}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {lang === "zh" ? "邮箱" : "Email"} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
              placeholder={lang === "zh" ? "your@email.com" : "your@email.com"}
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "公司" : "Company"} *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
            placeholder={lang === "zh" ? "公司名称" : "Company name"}
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {lang === "zh" ? "场地类型" : "Venue Type"} *
            </label>
            <select
              required
              value={formData.venueType}
              onChange={(e) => setFormData({ ...formData, venueType: e.target.value })}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
            >
              <option value="">{lang === "zh" ? "选择场地类型" : "Select venue type"}</option>
              <option value="shopping-mall">{lang === "zh" ? "购物中心" : "Shopping Mall"}</option>
              <option value="fec">{lang === "zh" ? "家庭娱乐中心" : "Family Entertainment Center"}</option>
              <option value="indoor-park">{lang === "zh" ? "室内主题公园" : "Indoor Theme Park"}</option>
              <option value="mixed-use">{lang === "zh" ? "混合用途开发" : "Mixed-Use Development"}</option>
              <option value="other">{lang === "zh" ? "其他" : "Other"}</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
              {lang === "zh" ? "估计层高" : "Estimated Ceiling Height"} *
            </label>
            <select
              required
              value={formData.ceilingHeight}
              onChange={(e) => setFormData({ ...formData, ceilingHeight: e.target.value })}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
            >
              <option value="">{lang === "zh" ? "选择层高" : "Select height"}</option>
              <option value="3-4m">{lang === "zh" ? "3-4米" : "3-4m"}</option>
              <option value="4-5m">{lang === "zh" ? "4-5米" : "4-5m"}</option>
              <option value="5-6m">{lang === "zh" ? "5-6米" : "5-6m"}</option>
              <option value="6m+">{lang === "zh" ? "6米以上" : "6m+"}</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            {lang === "zh" ? "项目详情" : "Project Details"}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/50"
            placeholder={lang === "zh" ? "请描述您的项目需求..." : "Please describe your project requirements..."}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 transition-all duration-200 hover:-translate-y-1 hover:brightness-110 active:scale-95 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
        >
          {lang === "zh" ? "提交申请" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

