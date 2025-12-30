"use client";

import { PageHero } from "../../components/PageHero";
import { Section } from "../../components/Section";
import { CertificationGrid, type Certification } from "../../components/CertificationGrid";
import { PatentCertificateGrid } from "../../components/PatentCertificateGrid";
import { FactoryTour } from "../../components/FactoryTour";
import { useLanguage } from "../../components/language";
import { copy } from "../../content/copy";
import { patentCertificates } from "../../content/patentCertificates";

export default function AboutPage() {
  const { lang } = useLanguage();
  const c = copy(lang);

  // Certifications data
  const certifications: Certification[] = [
    {
      name: "ISO 9001",
      description: "Quality Management System certification ensuring consistent quality standards",
      icon: "✓",
      badge: "Certified",
    },
    {
      name: "CE Marking",
      description: "European Conformity certification for safety and environmental standards",
      icon: "✓",
      badge: "Compliant",
    },
    {
      name: "RoHS",
      description: "Restriction of Hazardous Substances compliance for environmental safety",
      icon: "✓",
      badge: "Compliant",
    },
    {
      name: "EN 13814",
      description: "European standard for safety of amusement rides and devices",
      icon: "✓",
      badge: "Compliant",
    },
    {
      name: "ASTM F24",
      description: "American standard for amusement rides and devices safety",
      icon: "✓",
      badge: "Compliant",
    },
    {
      name: "Factory Testing",
      description: "Comprehensive load tests and safety inspections before delivery",
      icon: "✓",
      badge: "Verified",
    },
  ];

  // Factory gallery images (placeholder - replace with actual images)
  const galleryImages: string[] = [
    "/products/米盈游乐设备产品介绍 conv 0.jpeg",
    "/products/米盈游乐设备产品介绍 conv 1.jpeg",
    "/products/米盈游乐设备产品介绍 conv 10.jpeg",
  ];

  return (
    <div className="space-y-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="my-10">
          <PageHero
            headline="Engineering amusement rides with verified safety and global delivery."
            subhead="We guide buyers from concept to opening day, combining factory-level QA with transparent timelines and compliance-first execution."
          />
        </div>
      </div>

      {/* Manufacturing Capabilities */}
      <Section
        title={c.aboutPage?.manufacturingCapabilities?.title || "Manufacturing Capabilities"}
        subtitle={c.aboutPage?.manufacturingCapabilities?.subtitle || "State-of-the-art production facilities with rigorous quality control and international standards compliance."}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(c.aboutPage?.manufacturingCapabilities?.items || []).map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7df6ff]/10 text-[#7df6ff]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="flex-1 text-white/90">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section
        title={c.aboutPage?.certifications?.title || "Industry Certifications & Compliance"}
        subtitle={c.aboutPage?.certifications?.subtitle || "Our commitment to quality and safety is validated by international certifications and standards."}
      >
        <CertificationGrid certifications={certifications} />
      </Section>

      {/* Patent Certificates */}
      <Section
        title={c.patents?.title || "Patent Certificates"}
        subtitle={c.patents?.subtitle || "Our innovative designs are protected by patents, demonstrating our commitment to original engineering and intellectual property."}
      >
        <PatentCertificateGrid certificates={patentCertificates} lang={lang} />
      </Section>

      {/* Factory Tour */}
      <Section
        title={c.aboutPage?.factoryTour?.title || "Factory Tour"}
        subtitle={c.aboutPage?.factoryTour?.subtitle || "See our manufacturing process in action. Experience our production facilities and quality control systems firsthand."}
      >
        <FactoryTour
          videoUrl="https://www.youtube.com/@MiyingAmusementEquipment"
          galleryImages={galleryImages}
          ctaText={c.aboutPage?.factoryTour?.ctaText || "Schedule Factory Visit"}
          ctaHref="/visit"
        />
      </Section>

      {/* Long-Term Partnership */}
      <Section
        title={c.aboutPage?.partnership?.title || "Building Long-Term Partnerships"}
        subtitle={c.aboutPage?.partnership?.subtitle || "We don't just deliver rides—we build lasting relationships with our clients through reliability, transparency, and ongoing support."}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(c.aboutPage?.partnership?.items || []).map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 transition hover:border-[#7df6ff]/30 hover:bg-white/10"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00eaff]/10 text-[#00eaff]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="flex-1 text-white/90">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

