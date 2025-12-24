"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { ProductGrid } from "../../components/ProductGrid";
import { products } from "../../content/copy";

export default function ProductsPage() {
  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="Featured rides ready for deployment."
            subhead="Modeled after catalogs like Fabbri and amusement-rides.com, with clear specs for fast decisions."
            ctaPrimaryHref="/contact"
            ctaSecondaryHref="/visit"
            badge="Catalog"
          />
        </div>
      </div>

      <Section
        title="Available highlights"
        subtitle="Ask for full BOM, inspection reports, and shipping timelines."
      >
        <ProductGrid items={products} />
      </Section>
    </div>
  );
}

