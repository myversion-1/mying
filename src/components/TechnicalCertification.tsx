"use client";

import { useState, useEffect } from "react";
import { Award, FileCheck, Shield, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Modal } from "./ui/Modal";
import { awards } from "../content/awards";
import { patentCertificates } from "../content/patentCertificates";
import type { Product } from "../content/copy";
import type { Lang } from "./language";

type TechnicalCertificationProps = {
  product: Product;
  lang: Lang;
};

export function TechnicalCertification({ product, lang }: TechnicalCertificationProps) {
  const [selectedCert, setSelectedCert] = useState<{
    type: "iso" | "ce" | "patent";
    image: string;
    name: string;
    description: string;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isZh = lang === "zh";

  // Get ISO 9001 and CE certifications
  const isoCert = awards?.find((a) => a.id === "iso-9001") || null;
  const ceCert = awards?.find((a) => a.id === "ce-marking") || null;

  // Find patent certificates for this product
  // Match by product name (case-insensitive, flexible matching)
  const productPatents = (patentCertificates || []).filter((cert) => {
    const productNameEn = product.name.toLowerCase().trim();
    const certNameEn = (cert.nameEn || cert.name).toLowerCase().trim();
    
    // Extract key words from product name (first 2-3 words)
    const productKeywords = productNameEn.split(/\s+/).slice(0, 3);
    
    // Check if any keyword appears in certificate name
    return productKeywords.some(keyword => 
      keyword.length > 3 && certNameEn.includes(keyword)
    ) || certNameEn.includes(productNameEn) || 
           productNameEn.includes(certNameEn.split(" ")[0]);
  });

  // If no specific patents found, show generic patent info if patentCount exists
  const hasPatents = product.patentCount && product.patentCount > 0;

  const handleCertClick = (
    type: "iso" | "ce" | "patent",
    image: string,
    name: string,
    description: string
  ) => {
    setSelectedCert({ type, image, name, description });
    setImageError(false); // Reset error state when opening new cert
  };

  const getLocalizedText = (en: string, zh: string) => (isZh ? zh : en);

  // Only show component if there's at least one certification or patent
  const hasContent = (isoCert || ceCert || hasPatents);

  // Don't render until mounted to avoid hydration issues
  if (!isMounted || !hasContent) {
    return null;
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-white/[0.01] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#7df6ff]" />
          <h3 className="text-lg font-semibold text-white">
            {getLocalizedText(
              "Technical Certification & Patent",
              "技术认证与专利"
            )}
          </h3>
        </div>
        
        <p className="mb-6 text-sm text-white/60">
          {getLocalizedText(
            "Quality Guaranteed",
            "品质保证"
          )}
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* ISO 9001 */}
          {isoCert && (
            <button
              onClick={() =>
                handleCertClick(
                  "iso",
                  "/certificates/iso-9001.jpg", // Placeholder - replace with actual image path
                  isZh ? isoCert.nameZh || isoCert.nameEn || isoCert.name || "" : isoCert.nameEn || isoCert.name || "",
                  isZh
                    ? isoCert.descriptionZh || isoCert.description || ""
                    : isoCert.descriptionEn || isoCert.description || ""
                )
              }
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-[#7df6ff]/30 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#7df6ff]/10 text-[#7df6ff] transition-transform group-hover:scale-110">
                <FileCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">
                  {isZh ? isoCert.nameZh : isoCert.nameEn || isoCert.name}
                </div>
                <div className="text-xs text-white/60">
                  {getLocalizedText("Quality Standard", "质量标准")}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </button>
          )}

          {/* CE Marking */}
          {ceCert && (
            <button
              onClick={() =>
                handleCertClick(
                  "ce",
                  "/certificates/ce-marking.jpg", // Placeholder - replace with actual image path
                  isZh ? ceCert.nameZh || ceCert.nameEn || ceCert.name || "" : ceCert.nameEn || ceCert.name || "",
                  isZh
                    ? ceCert.descriptionZh || ceCert.description || ""
                    : ceCert.descriptionEn || ceCert.description || ""
                )
              }
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-[#7df6ff]/30 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#7df6ff]/10 text-[#7df6ff] transition-transform group-hover:scale-110">
                <Shield className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">
                  {isZh ? ceCert.nameZh : ceCert.nameEn || ceCert.name}
                </div>
                <div className="text-xs text-white/60">
                  {getLocalizedText("Safety Standard", "安全标准")}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </button>
          )}

          {/* Patents */}
          {hasPatents && (
            <button
              onClick={() => {
                // If specific patents found, show first one; otherwise show generic
                if (productPatents.length > 0) {
                  const firstPatent = productPatents[0];
                  handleCertClick(
                    "patent",
                    firstPatent.image || "",
                    isZh
                      ? firstPatent.nameZh || firstPatent.name || ""
                      : firstPatent.nameEn || firstPatent.name || "",
                    isZh
                      ? firstPatent.descriptionZh || firstPatent.description || ""
                      : firstPatent.descriptionEn || firstPatent.description || ""
                  );
                } else {
                  handleCertClick(
                    "patent",
                    "/certificates/patent-placeholder.jpg", // Placeholder
                    getLocalizedText(
                      `${product.patentCount} R&D Patents`,
                      `${product.patentCount} 项研发专利`
                    ),
                    getLocalizedText(
                      "Technical Innovation",
                      "技术创新"
                    )
                  );
                }
              }}
              className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:border-[#7df6ff]/30 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#7df6ff]/10 text-[#7df6ff] transition-transform group-hover:scale-110">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">
                  {getLocalizedText(
                    `${product.patentCount}+ Patents`,
                    `${product.patentCount}+ 专利`
                  )}
                </div>
                <div className="text-xs text-white/60">
                  {getLocalizedText("Patent Number", "专利编号")}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.name}
      >
        {selectedCert && (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5">
              {!imageError ? (
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  fill
                  className="object-contain p-4"
                  sizes="90vw"
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center text-white/60">
                    <FileCheck className="mx-auto mb-2 h-12 w-12 opacity-50" />
                    <p className="text-sm">
                      {getLocalizedText(
                        "Certificate image not available",
                        "证书图片不可用"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-center text-sm text-white/70">
              {selectedCert.description}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

