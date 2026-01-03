"use client";

import { useState, useEffect } from "react";
import { SUPPORTED_LANGUAGES } from "@/utils/hreflang";

type BacklinkStatus = "Active" | "Lost" | "No-Follow" | "Pending";

interface Backlink {
  id: string;
  externalUrl: string;
  targetUrl: string;
  language: string;
  status: BacklinkStatus;
  linkType?: "dofollow" | "nofollow" | "meta";
  anchorText?: string;
  lastChecked?: string;
  createdAt: string;
  notes?: string;
}

interface ProductUrl {
  url: string;
  label: string;
  slug: string;
  lang: string;
}

export default function SEOTrackerPage() {
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [productUrls, setProductUrls] = useState<ProductUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    externalUrl: "",
    targetUrl: "",
    language: "en",
    notes: "",
  });

  // Fetch backlinks
  const fetchBacklinks = async () => {
    try {
      const response = await fetch("/api/seo-tracker/backlinks");
      if (response.ok) {
        const data = await response.json();
        setBacklinks(data.backlinks || []);
      }
    } catch (error) {
      console.error("Error fetching backlinks:", error);
    }
  };

  // Fetch product URLs
  const fetchProductUrls = async () => {
    try {
      const response = await fetch("/api/seo-tracker/product-urls");
      if (response.ok) {
        const data = await response.json();
        setProductUrls(data.productUrls || []);
      }
    } catch (error) {
      console.error("Error fetching product URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBacklinks();
    fetchProductUrls();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/seo-tracker/backlinks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setBacklinks([...backlinks, data.backlink]);
        setFormData({
          externalUrl: "",
          targetUrl: "",
          language: "en",
          notes: "",
        });
        alert("Backlink added successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating backlink:", error);
      alert("Failed to create backlink");
    } finally {
      setSubmitting(false);
    }
  };

  // Check single backlink
  const handleCheck = async (id: string) => {
    setChecking(id);
    try {
      const response = await fetch("/api/seo-tracker/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the backlink in the list
        setBacklinks(
          backlinks.map((bl) => (bl.id === id ? data.backlink : bl))
        );
        alert(`Status: ${data.checkResult.status}`);
      } else {
        alert("Failed to check backlink");
      }
    } catch (error) {
      console.error("Error checking backlink:", error);
      alert("Failed to check backlink");
    } finally {
      setChecking(null);
    }
  };

  // Delete backlink
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this backlink?")) {
      return;
    }

    try {
      const response = await fetch(
        `/api/seo-tracker/backlinks?id=${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setBacklinks(backlinks.filter((bl) => bl.id !== id));
        alert("Backlink deleted successfully!");
      } else {
        alert("Failed to delete backlink");
      }
    } catch (error) {
      console.error("Error deleting backlink:", error);
      alert("Failed to delete backlink");
    }
  };

  // Get status badge color
  const getStatusColor = (status: BacklinkStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "Lost":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "No-Follow":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "Pending":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c1014] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">SEO Backlink Tracker</h1>
        <p className="text-white/70 mb-8">
          Track and monitor backlinks to your product pages
        </p>

        {/* Add Backlink Form */}
        <div className="bg-[#1a1f2e] rounded-lg p-6 mb-8 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">Add New Backlink</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  External URL (where you posted the link)
                </label>
                <input
                  type="url"
                  required
                  value={formData.externalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, externalUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0c1014] border border-white/20 rounded-lg focus:outline-none focus:border-[#7df6ff]"
                  placeholder="https://example.com/article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Target Product URL
                </label>
                <select
                  required
                  value={formData.targetUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, targetUrl: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0c1014] border border-white/20 rounded-lg focus:outline-none focus:border-[#7df6ff]"
                >
                  <option value="">Select a product URL...</option>
                  {productUrls.map((item) => (
                    <option key={`${item.slug}-${item.lang}`} value={item.url}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Language
                </label>
                <select
                  required
                  value={formData.language}
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0c1014] border border-white/20 rounded-lg focus:outline-none focus:border-[#7df6ff]"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Notes (optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-[#0c1014] border border-white/20 rounded-lg focus:outline-none focus:border-[#7df6ff]"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 bg-[#7df6ff] text-[#0c1014] font-semibold rounded-lg hover:bg-[#00eaff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Adding..." : "Add Backlink"}
            </button>
          </form>
        </div>

        {/* Backlinks Table */}
        <div className="bg-[#1a1f2e] rounded-lg border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-semibold">Backlinks ({backlinks.length})</h2>
          </div>

          {backlinks.length === 0 ? (
            <div className="p-8 text-center text-white/70">
              No backlinks tracked yet. Add your first backlink above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0c1014] border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">External URL</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Target URL</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Language</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Link Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Last Checked</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {backlinks.map((backlink) => (
                    <tr
                      key={backlink.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <a
                          href={backlink.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7df6ff] hover:text-[#00eaff] truncate max-w-xs block"
                        >
                          {backlink.externalUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={backlink.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#7df6ff] hover:text-[#00eaff] truncate max-w-xs block"
                        >
                          {backlink.targetUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 uppercase">{backlink.language}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            backlink.status
                          )}`}
                        >
                          {backlink.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {backlink.linkType ? (
                          <span className="text-white/70 capitalize">
                            {backlink.linkType}
                          </span>
                        ) : (
                          <span className="text-white/30">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-white/70">
                        {backlink.lastChecked
                          ? new Date(backlink.lastChecked).toLocaleDateString()
                          : "Never"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCheck(backlink.id)}
                            disabled={checking === backlink.id}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 text-sm disabled:opacity-50"
                          >
                            {checking === backlink.id ? "Checking..." : "Check"}
                          </button>
                          <button
                            onClick={() => handleDelete(backlink.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-white/80">
            <strong>Note:</strong> The cron job runs weekly to automatically check all backlinks.
            You can also manually check individual backlinks using the "Check" button.
            Set up the cron job in Vercel Dashboard or via vercel.json configuration.
          </p>
        </div>
      </div>
    </div>
  );
}

