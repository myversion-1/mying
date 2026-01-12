"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "../../../content/copy";
import { getProductBySlug } from "../../../content/products_multilingual";
import { productsMultilingual } from "../../../content/products_multilingual";
import { useLanguage } from "../../../components/language";
import { Section } from "../../../components/Section";
import { ProductSpecs } from "../../../components/ProductSpecs";
import Link from "next/link";
import Image from "next/image";
import { encodeImagePath, hasNonASCIICharacters } from "../../../utils/image-utils";

type ComparisonProduct = {
  id: string;
  name: string;
  category: string;
  image?: string;
  footprint: string;
  height: string;
  riders: string;
  mainCategory?: string;
  positioning?: string;
  safetyCompliance?: string[];
  venueRequirements?: string;
  powerSupply?: string;
  status?: string;
  year?: string;
  badge?: string;
  [key: string]: any;
};

function ComparePageContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<ComparisonProduct[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ComparisonProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize from URL parameters
  useEffect(() => {
    const productIds = searchParams.get("products")?.split(",").filter(Boolean) || [];
    if (productIds.length > 0) {
      const products = productIds
        .map((id) => {
          const product = getProductBySlug(id, lang);
          if (!product) return null;
          return {
            id,
            name: product.name,
            category: product.category,
            image: product.image,
            footprint: product.footprint,
            height: product.height,
            riders: product.riders,
            mainCategory: product.mainCategory,
            positioning: product.positioning,
            safetyCompliance: product.safetyCompliance,
            venueRequirements: product.venueRequirements,
            powerSupply: product.powerSupply,
            status: product.status,
            year: product.year,
            badge: product.badge,
          };
        })
        .filter((p) => p !== null) as ComparisonProduct[];
      setSelectedProducts(products);
    }
  }, [searchParams, lang]);

  // Load available products for selection
  useEffect(() => {
    const products = getProducts(lang);
    setAvailableProducts(
      products.map((p, index) => {
        const slug = productsMultilingual[index]?.name?.en
          ?.toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") || `product-${index}`;
        return {
          id: slug,
          name: p.name,
          category: p.category,
          image: p.image,
          footprint: p.footprint,
          height: p.height,
          riders: p.riders,
          mainCategory: p.mainCategory,
          positioning: p.positioning,
          safetyCompliance: p.safetyCompliance,
        };
      })
    );
  }, [lang]);

  const addProduct = (product: ComparisonProduct) => {
    if (selectedProducts.length >= 4) {
      alert(lang === "zh" ? "最多可以比较4个产品" : "Maximum 4 products can be compared");
      return;
    }
    if (selectedProducts.some((p) => p.id === product.id)) {
      return; // Already added
    }
    const newProducts = [...selectedProducts, product];
    setSelectedProducts(newProducts);
    updateURL(newProducts);
  };

  const removeProduct = (productId: string) => {
    const newProducts = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(newProducts);
    updateURL(newProducts);
  };

  const updateURL = (products: ComparisonProduct[]) => {
    const productIds = products.map((p) => p.id).join(",");
    const newURL = productIds
      ? `/products/compare?products=${encodeURIComponent(productIds)}`
      : "/products/compare";
    router.push(newURL, { scroll: false });
  };

  const filteredAvailableProducts = availableProducts.filter((p) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.mainCategory?.toLowerCase().includes(query)
    );
  });

  const comparisonFields = [
    { key: "name", label: { en: "Product Name", zh: "产品名称" } },
    { key: "category", label: { en: "Category", zh: "类别" } },
    { key: "footprint", label: { en: "Footprint", zh: "占地面积" } },
    { key: "height", label: { en: "Height", zh: "高度" } },
    { key: "riders", label: { en: "Capacity", zh: "容量" } },
    { key: "status", label: { en: "Status", zh: "状态" } },
    { key: "positioning", label: { en: "Positioning", zh: "产品定位" } },
  ];

  const isZh = lang === "zh";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {isZh ? "产品对比" : "Compare Products"}
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          {isZh
            ? "选择最多4个产品进行详细对比，帮助您做出最佳决策"
            : "Select up to 4 products to compare side-by-side and make the best decision"}
        </p>
      </div>

      {/* Product Selection */}
      <Section
        id="product-selection"
        title={isZh ? "选择要对比的产品" : "Select Products to Compare"}
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder={isZh ? "搜索产品..." : "Search products..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--accent-primary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAvailableProducts.map((product) => {
            const isSelected = selectedProducts.some((p) => p.id === product.id);
            return (
              <div
                key={product.id}
                className={`group relative rounded-2xl border p-4 transition ${
                  isSelected
                    ? "border-[var(--action-primary)] bg-[var(--action-primary)]/10"
                    : "border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent-primary)]/30"
                }`}
              >
                {product.image && (
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                      {hasNonASCIICharacters(product.image) ? (
                      <img
                        src={encodeImagePath(product.image)}
                        alt={`${product.name} - ${product.category} amusement ride comparison`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={product.image}
                        alt={`${product.name} - ${product.category} amusement ride comparison`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                      />
                    )}
                  </div>
                )}
                <h3 className="mb-2 font-semibold text-[var(--text-primary)]">{product.name}</h3>
                <p className="mb-3 text-sm text-[var(--text-secondary)]">{product.category}</p>
                {isSelected ? (
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="w-full rounded-lg border border-[var(--action-primary)] bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
                  >
                    {isZh ? "移除" : "Remove"}
                  </button>
                ) : (
                  <button
                    onClick={() => addProduct(product)}
                    disabled={selectedProducts.length >= 4}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:bg-[var(--surface-hover)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation"
                  >
                    {isZh ? "添加对比" : "Add to Compare"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Comparison Table */}
      {selectedProducts.length > 0 && (
        <Section
          id="comparison-table"
          title={isZh ? "产品对比表" : "Product Comparison"}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="p-4 text-left font-semibold text-[var(--text-primary)]">
                    {isZh ? "规格" : "Specification"}
                  </th>
                  {selectedProducts.map((product) => (
                    <th key={product.id} className="p-4 text-left font-semibold text-[var(--text-primary)]">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold">{product.name}</div>
                          <div className="text-sm font-normal text-[var(--text-secondary)]">
                            {product.category}
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="ml-4 rounded p-1 text-[var(--text-tertiary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] min-h-[32px] min-w-[32px] touch-manipulation"
                          aria-label={isZh ? "移除" : "Remove"}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-b border-[var(--border)]">
                    <td className="p-4 font-semibold text-[var(--text-primary)]">
                      {field.label[isZh ? "zh" : "en"]}
                    </td>
                    {selectedProducts.map((product) => (
                      <td key={product.id} className="p-4 text-[var(--text-secondary)]">
                        {product[field.key] || (isZh ? "—" : "—")}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-[var(--border)]">
                  <td className="p-4 font-semibold text-[var(--text-primary)]">
                    {isZh ? "安全认证" : "Safety Compliance"}
                  </td>
                  {selectedProducts.map((product) => (
                    <td key={product.id} className="p-4 text-[var(--text-secondary)]">
                      {product.safetyCompliance && product.safetyCompliance.length > 0 ? (
                        <ul className="space-y-1">
                          {product.safetyCompliance.slice(0, 3).map((item: string, idx: number) => (
                            <li key={idx} className="text-sm">• {item}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            {selectedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-center font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-primary)]/50 hover:bg-[var(--surface-hover)] min-h-[44px] touch-manipulation"
              >
                {isZh ? `查看 ${product.name}` : `View ${product.name}`}
              </Link>
            ))}
            <Link
              href={`/quote?products=${selectedProducts.map((p) => p.id).join(",")}`}
              className="flex-1 rounded-lg bg-[var(--action-primary)] px-4 py-3 text-center font-semibold text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
            >
              {isZh ? "获取报价" : "Get Quote"}
            </Link>
          </div>
        </Section>
      )}

      {/* Empty State */}
      {selectedProducts.length === 0 && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-12 text-center">
          <p className="mb-4 text-lg text-[var(--text-secondary)]">
            {isZh
              ? "选择产品开始对比"
              : "Select products above to start comparing"}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-6 py-3 font-semibold text-[var(--action-primary-text)] transition-colors hover:bg-[var(--action-primary-hover)] min-h-[44px] touch-manipulation"
          >
            <span>{isZh ? "浏览产品" : "Browse Products"}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <div className="text-center text-[var(--text-secondary)]">Loading...</div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  );
}

