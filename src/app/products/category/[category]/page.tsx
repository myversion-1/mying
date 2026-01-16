import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getMainCategories, type MainCategory } from "../../../../content/product-categories";
import { getProducts } from "../../../../content/copy";
import { Section } from "../../../../components/Section";
import { ProductCard } from "../../../../components/ProductCard";
import { StructuredDataServer } from "../../../../components/StructuredDataServer";
import Link from "next/link";
import type { Lang } from "../../../../components/language";

interface CategoryPageProps {
  params: Promise<{
    category: string;
    lang?: string;
  }>;
}

function generateCategorySlug(category: MainCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function getCategoryFromSlug(slug: string): MainCategory | null {
  const mainCategories = getMainCategories();
  return mainCategories.find(cat => generateCategorySlug(cat) === slug) || null;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);
  
  if (!category) {
    return {
      title: "Category Not Found | Miying",
    };
  }

  const categoryName = category;
  // Ensure primary keyword is in first 60 characters
  const title = `${categoryName} Amusement Rides Manufacturer | Buy Online`;
  const description = `Browse our complete range of ${categoryName.toLowerCase()}. Factory direct pricing, CE certified, custom configurations available. ISO certified manufacturer with 500+ installations worldwide.`;

  return {
    title,
    description,
    keywords: [
      `${categoryName.toLowerCase()} manufacturer`,
      `${categoryName.toLowerCase()} supplier`,
      `buy ${categoryName.toLowerCase()}`,
      `${categoryName.toLowerCase()} for sale`,
      "amusement equipment",
      "theme park equipment",
    ],
    openGraph: {
      title,
      description,
      url: `/products/category/${categorySlug}`,
    },
    alternates: {
      canonical: `/products/category/${categorySlug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryFromSlug(categorySlug);
  
  if (!category) {
    notFound();
  }

  const lang = "en" as Lang; // Default to English, can be enhanced with language detection
  const products = getProducts(lang);
  const categoryProducts = products.filter(p => p.mainCategory === category);

  const categoryName = category;
  const isZh = lang === "zh";

  return (
    <>
      <StructuredDataServer type="products" />
      
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 md:px-8 md:py-12">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-[var(--accent-primary)]">Home</Link>
          {" / "}
          <Link href="/products" className="hover:text-[var(--accent-primary)]">Products</Link>
          {" / "}
          <span className="text-[var(--text-primary)]">{categoryName}</span>
        </nav>

        {/* H1: Category Name - Manufacturer Direct Supply */}
        <h1 className="mb-4 text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {categoryName} - Manufacturer Direct Supply
        </h1>
        <p className="mb-8 text-lg text-[var(--text-secondary)]">
          {isZh 
            ? `浏览我们完整的${categoryName}系列。工厂直销价格，CE认证，可定制配置。`
            : `Browse our complete range of ${categoryName.toLowerCase()}. Factory direct pricing, CE certified, custom configurations available.`}
        </p>

        {/* About [Category] Equipment */}
        <Section
          id="about-category"
          title={isZh ? `关于${categoryName}设备` : `About ${categoryName} Equipment`}
        >
          <div className="prose prose-lg max-w-none text-[var(--text-secondary)]">
            <p className="text-lg leading-relaxed">
              {isZh
                ? `${categoryName}是主题公园和家庭娱乐中心的核心设备类别。我们的${categoryName}系列经过工厂测试，符合国际安全标准，包括CE、ASTM和EN认证。我们提供从标准型号到完全定制设计的全方位解决方案。`
                : `${categoryName} represents a core category of equipment for theme parks and family entertainment centers. Our ${categoryName.toLowerCase()} range is factory-tested and meets international safety standards including CE, ASTM, and EN certifications. We offer comprehensive solutions from standard models to fully custom designs.`}
            </p>
            <ul className="mt-4 space-y-2">
              {isZh ? (
                <>
                  <li>• 工厂测试，符合国际安全标准</li>
                  <li>• CE、ASTM、EN认证</li>
                  <li>• 从标准型号到定制设计的全方位解决方案</li>
                  <li>• 全球交付和安装支持</li>
                </>
              ) : (
                <>
                  <li>• Factory-tested, meets international safety standards</li>
                  <li>• CE, ASTM, EN certified</li>
                  <li>• Comprehensive solutions from standard to custom designs</li>
                  <li>• Global delivery and installation support</li>
                </>
              )}
            </ul>
          </div>
        </Section>

        {/* Popular Models */}
        {categoryProducts.length > 0 && (
          <Section
            id="popular-models"
            title={isZh ? "热门型号" : "Popular Models"}
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.slice(0, 6).map((product, index) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  lang={lang}
                  index={index}
                  isRTL={false}
                />
              ))}
            </div>
            {categoryProducts.length > 6 && (
              <div className="mt-8 text-center">
                <Link
                  href={`/products?mainCategory=${encodeURIComponent(category)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-3 sm:px-8 sm:py-3 text-base font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-xl hover:shadow-[var(--action-primary)]/50 hover:-translate-y-0.5 hover:brightness-110 active:scale-95 transition-all duration-200 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
                >
                  <span>{isZh ? "查看所有型号" : "View All Models"}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </Section>
        )}

        {/* Technical Specifications */}
        <Section
          id="technical-specifications"
          title={isZh ? "技术规格" : "Technical Specifications"}
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6">
            <p className="mb-4 text-[var(--text-secondary)]">
              {isZh
                ? "我们的设备符合以下技术标准："
                : "Our equipment meets the following technical standards:"}
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-[var(--text-primary)]">
                  {isZh ? "安全标准" : "Safety Standards"}
                </h4>
                <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <li>• EN 13814 (European Standard)</li>
                  <li>• ASTM F24 (US Standard)</li>
                  <li>• CE Marking</li>
                  <li>• ISO 9001 Quality Management</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-[var(--text-primary)]">
                  {isZh ? "典型规格" : "Typical Specifications"}
                </h4>
                <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <li>• {isZh ? "容量" : "Capacity"}: 8-48 {isZh ? "名乘客" : "passengers per cycle"}</li>
                  <li>• {isZh ? "占地面积" : "Footprint"}: 50-500 m²</li>
                  <li>• {isZh ? "电源要求" : "Power"}: 10-100 kW</li>
                  <li>• {isZh ? "运行周期" : "Cycle Time"}: 2-5 {isZh ? "分钟" : "minutes"}</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Customization Options */}
        <Section
          id="customization-options"
          title={isZh ? "定制选项" : "Customization Options"}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: isZh ? "颜色方案" : "Color Schemes",
                desc: isZh ? "多种颜色选择，匹配您的品牌主题" : "Multiple color options to match your brand theme",
              },
              {
                title: isZh ? "主题定制" : "Theming Options",
                desc: isZh ? "完全定制主题，匹配您的概念" : "Fully custom theming to match your concept",
              },
              {
                title: isZh ? "容量变化" : "Capacity Variations",
                desc: isZh ? "根据场地要求调整容量" : "Adjustable capacity based on venue requirements",
              },
            ].map((option, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-6"
              >
                <h4 className="mb-2 font-semibold text-[var(--text-primary)]">{option.title}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{option.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Safety & Certifications */}
        <Section
          id="safety-certifications"
          title={isZh ? "安全与认证" : "Safety & Certifications"}
        >
          <div className="rounded-2xl border border-[var(--accent-secondary)]/20 bg-[var(--accent-primary-light)] p-6">
            <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
              {isZh ? "安全特性" : "Safety Features"}
            </h3>
            <ul className="mb-6 space-y-2 text-[var(--text-secondary)]">
              <li>• {isZh ? "紧急停止系统" : "Emergency stop systems"}</li>
              <li>• {isZh ? "多重安全传感器" : "Multiple safety sensors"}</li>
              <li>• {isZh ? "符合人体工程学的约束系统" : "Ergonomic restraint systems"}</li>
              <li>• {isZh ? "定期安全检查协议" : "Regular safety inspection protocols"}</li>
            </ul>
            <h3 className="mb-4 text-xl font-semibold text-[var(--text-primary)]">
              {isZh ? "合规认证" : "Compliance Certifications"}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-semibold text-[var(--text-primary)]">CE Marking</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {isZh ? "符合欧盟安全标准" : "Compliant with EU safety standards"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">ASTM F24</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {isZh ? "符合美国安全标准" : "Compliant with US safety standards"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">EN 13814</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {isZh ? "欧洲游乐设备安全标准" : "European amusement ride safety standard"}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">ISO 9001</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {isZh ? "质量管理体系认证" : "Quality management system certification"}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-[var(--text-primary)]">
            {isZh ? "获取定制报价" : "Get Custom Quote"}
          </h2>
          <p className="mb-6 text-[var(--text-secondary)]">
            {isZh
              ? "联系我们的团队获取详细的技术规格和定价信息"
              : "Contact our team for detailed technical specifications and pricing information"}
          </p>
          <Link
            href={`/quote?category=${encodeURIComponent(category)}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--action-primary)] to-[var(--accent-primary)] px-6 py-4 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold shadow-lg shadow-[var(--action-primary)]/30 hover:shadow-2xl hover:shadow-[var(--action-primary)]/50 hover:-translate-y-1 hover:brightness-110 active:scale-95 transition-all duration-200 min-h-[44px] touch-manipulation text-[var(--action-primary-text)] border border-[var(--action-primary)]/20"
          >
            <span>{isZh ? "请求报价" : "Request Quote"}</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

