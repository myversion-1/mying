"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./language";

interface ConsultationBookingProps {
  serviceName: string;
  onClose: () => void;
}

/**
 * 15-Minute Technical Consultation Booking Component
 * Simple calendar component for booking technical consultations
 */
export function ConsultationBooking({
  serviceName,
  onClose,
}: ConsultationBookingProps) {
  const { lang } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate available time slots (9 AM to 6 PM, every 30 minutes)
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    return `${hour.toString().padStart(2, "0")}:${minute}`;
  });

  // Generate calendar dates (next 30 days)
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error booking consultation:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-w-2xl w-full bg-[var(--dark-bg-base)] rounded-2xl border border-white/10 p-6 md:p-8 my-8"
      >
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

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
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
                {lang === "zh" ? "预约成功！" : "Booking Confirmed!"}
              </h3>
              <p className="text-[var(--dark-bg-text-secondary)]">
                {lang === "zh"
                  ? "我们已收到您的预约请求，将尽快与您确认"
                  : "We've received your booking request and will confirm shortly"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {lang === "zh" ? "预约 15 分钟技术咨询" : "Schedule 15-Min Technical Consultation"}
                </h3>
                <p className="text-[var(--dark-bg-text-secondary)] text-sm">
                  {lang === "zh"
                    ? `为 ${serviceName} 服务预约技术专家咨询`
                    : `Schedule a technical consultation for ${serviceName}`}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    {lang === "zh" ? "选择日期" : "Select Date"} *
                  </label>
                  <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto">
                    {dates.map((date) => {
                      const isSelected =
                        selectedDate?.toDateString() === date.toDateString();
                      const isToday = date.toDateString() === today.toDateString();
                      return (
                        <button
                          key={date.toDateString()}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`rounded-lg border p-3 text-center transition ${
                            isSelected
                              ? "border-[var(--accent-primary)] bg-[var(--accent-primary-light)] text-[var(--accent-primary)]"
                              : "border-white/20 bg-white/5 text-[var(--dark-bg-text-secondary)] hover:border-white/30"
                          } ${isToday ? "ring-2 ring-[var(--accent-primary)]/50" : ""} min-h-[44px] min-w-[44px] touch-manipulation`}
                        >
                          <div className="text-xs font-medium">
                            {formatDate(date)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <label className="block text-sm font-medium text-[var(--dark-bg-text)] mb-3">
                      {lang === "zh" ? "选择时间" : "Select Time"} *
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border px-3 py-2 text-sm transition min-h-[44px] min-w-[44px] touch-manipulation ${
                            selectedTime === time
                              ? "border-[var(--accent-primary)] bg-[var(--accent-primary-light)] text-[var(--accent-primary)]"
                              : "border-white/20 bg-white/5 text-[var(--dark-bg-text-secondary)] hover:border-white/30"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contact Information */}
                <div className="grid gap-4 md:grid-cols-2">
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
                      placeholder={lang === "zh" ? "请输入姓名" : "Enter name"}
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
                      placeholder={lang === "zh" ? "请输入公司名称" : "Enter company"}
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
                      placeholder={lang === "zh" ? "请输入邮箱" : "Enter email"}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[var(--dark-bg-text)] mb-2"
                    >
                      {lang === "zh" ? "电话" : "Phone"} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-[var(--dark-bg-text)] placeholder:text-[var(--dark-bg-text-tertiary)] focus:border-[var(--accent-primary)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 min-h-[44px] touch-manipulation"
                      placeholder={lang === "zh" ? "请输入电话" : "Enter phone"}
                    />
                  </div>
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
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className="flex-1 rounded-lg bg-[var(--action-primary)] px-4 py-3 font-semibold text-[var(--action-primary-text)] !text-[var(--action-primary-text)] hover:bg-[var(--action-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] touch-manipulation"
                  >
                    {isSubmitting
                      ? lang === "zh"
                        ? "提交中..."
                        : "Submitting..."
                      : lang === "zh"
                      ? "确认预约"
                      : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}



