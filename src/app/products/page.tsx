"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ProductGrid } from "../../components/ProductGrid";
import { getProducts, copy } from "../../content/copy";
import { useLanguage } from "../../components/language";

export default function ProductsPage() {
  const { lang } = useLanguage();
  const c = copy(lang);
  const products = getProducts(lang);

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline={c.productsTitle}
            subhead={c.productsSubtitle}
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/visit"
            badge={c.pageBadges.catalog}
          />
        </div>
      </div>

      <Section
        title={c.productsTitle}
        subtitle={c.productsSubtitle}
      >
        <ProductGrid items={products} />
      </Section>
    </div>
  );
}

