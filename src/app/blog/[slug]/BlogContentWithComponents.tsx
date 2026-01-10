"use client";

import { RefurbishmentProcess } from "../../../components/blog/RefurbishmentProcess";
import { RefurbishmentComparison } from "../../../components/blog/RefurbishmentComparison";
import { BeforeAfter } from "../../../components/blog/BeforeAfter";
import { BeforeAfterSlider } from "../../../components/blog/BeforeAfterSlider";
import { CornerEquipmentComparison } from "../../../components/blog/CornerEquipmentComparison";
import { CaseStudyBreakout } from "../../../components/blog/CaseStudyBreakout";
import { SpatialAuditForm } from "../../../components/blog/SpatialAuditForm";
import { RetailStatsSidebar } from "../../../components/blog/RetailStatsSidebar";
import { ScrollReveal } from "../../../components/blog/ScrollReveal";

interface BlogContentWithComponentsProps {
  content: string;
  postId?: string;
}

export function BlogContentWithComponents({ content, postId }: BlogContentWithComponentsProps) {
  // Process content and extract components
  const processItems = [
    {
      icon: "🔍",
      title: "Structural Integrity Audits",
      description: "Utilizing non-destructive testing (NDT) to identify microscopic fatigue before it becomes a safety liability.",
    },
    {
      icon: "⚡",
      title: "Electronic Modernization",
      description: "Replacing legacy control systems with contemporary PLC (Programmable Logic Controller) architectures to improve reliability and energy efficiency.",
    },
    {
      icon: "🎨",
      title: "Thematic Recalibration",
      description: "Updating the visual narrative—from LED arrays to custom fiberglass finishes—to align with current pop-culture trends.",
    },
  ];

  const comparisonData = [
    {
      category: "Cost",
      newPurchase: 100,
      refurbishment: 50,
      unit: "%",
    },
    {
      category: "Installation Time",
      newPurchase: 12,
      refurbishment: 4,
      unit: "weeks",
    },
    {
      category: "Environmental Impact",
      newPurchase: 100,
      refurbishment: 30,
      unit: "%",
    },
  ];

  // Process content: replace component markers with actual components
  let processedContent = content;
  
  // Find and replace refurbishment-process
  if (content.includes('class="refurbishment-process"')) {
    const marker = /<div class="refurbishment-process">[\s\S]*?<\/div>/;
    processedContent = processedContent.replace(marker, '<!--REFURBISHMENT_PROCESS-->');
  }
  
  // Find and replace comparison-chart
  if (content.includes('class="comparison-chart"')) {
    const marker = /<div class="comparison-chart"[\s\S]*?<\/div>/;
    processedContent = processedContent.replace(marker, '<!--COMPARISON_CHART-->');
  }
  
  // Find and replace before-after
  if (content.includes('class="before-after"')) {
    const marker = /<div class="before-after">[\s\S]*?<\/div>/;
    processedContent = processedContent.replace(marker, '<!--BEFORE_AFTER-->');
  }
  
  // Find and replace before-after-slider
  if (content.includes('class="before-after-slider"')) {
    const marker = /<div class="before-after-slider"[\s\S]*?<\/div>/;
    const match = content.match(/data-label="([^"]*)"/);
    const label = match ? match[1] : "Space Transformation Efficiency";
    processedContent = processedContent.replace(marker, `<!--BEFORE_AFTER_SLIDER:${label}-->`);
  }
  
  // Find and replace comparison-table
  if (content.includes('class="comparison-table"')) {
    const marker = /<div class="comparison-table"[\s\S]*?<\/div>/;
    processedContent = processedContent.replace(marker, '<!--COMPARISON_TABLE-->');
  }
  
  // Find and replace case-study-breakout (handle nested content)
  if (content.includes('class="case-study-breakout"')) {
    const marker = /<div class="case-study-breakout">([\s\S]*?)<\/div>/g;
    let match;
    while ((match = marker.exec(content)) !== null) {
      const breakoutContent = match[1];
      processedContent = processedContent.replace(match[0], `<!--CASE_STUDY_BREAKOUT:${breakoutContent.replace(/-->/g, '&#45;&#45;&gt;')}-->`);
    }
  }
  
  // Split by component markers and render
  const parts = processedContent.split(/(<!--REFURBISHMENT_PROCESS-->|<!--COMPARISON_CHART-->|<!--BEFORE_AFTER-->|<!--BEFORE_AFTER_SLIDER:[^>]*-->|<!--COMPARISON_TABLE-->|<!--CASE_STUDY_BREAKOUT:[^>]*-->)/);

  return (
    <>
      {parts.map((part, index) => {
        if (part === '<!--REFURBISHMENT_PROCESS-->') {
          return <RefurbishmentProcess key={`process-${index}`} items={processItems} />;
        }
        if (part === '<!--COMPARISON_CHART-->') {
          return <RefurbishmentComparison key={`comparison-${index}`} data={comparisonData} />;
        }
        if (part === '<!--BEFORE_AFTER-->') {
          return (
            <BeforeAfter
              key={`beforeafter-${index}`}
              beforeAlt="Worn, outdated equipment before refurbishment"
              afterAlt="Modern, refreshed equipment after refurbishment"
            />
          );
        }
        if (part.startsWith('<!--BEFORE_AFTER_SLIDER:')) {
          const label = part.match(/<!--BEFORE_AFTER_SLIDER:(.*?)-->/)?.[1] || "Space Transformation Efficiency";
          return (
            <ScrollReveal key={`slider-${index}`} className="before-after-slider">
              <BeforeAfterSlider label={label} />
            </ScrollReveal>
          );
        }
        if (part === '<!--COMPARISON_TABLE-->') {
          return (
            <ScrollReveal key={`table-${index}`} className="comparison-table">
              <CornerEquipmentComparison />
            </ScrollReveal>
          );
        }
        if (part.startsWith('<!--CASE_STUDY_BREAKOUT:')) {
          const breakoutContent = part.match(/<!--CASE_STUDY_BREAKOUT:(.*?)-->/)?.[1] || "";
          const decodedContent = breakoutContent.replace(/&#45;&#45;&gt;/g, '-->');
          return (
            <ScrollReveal key={`breakout-${index}`} className="case-study-breakout">
              <CaseStudyBreakout>
                <div dangerouslySetInnerHTML={{ __html: decodedContent }} />
              </CaseStudyBreakout>
            </ScrollReveal>
          );
        }
        // Regular HTML content
        if (part.trim() && !part.startsWith('<!--')) {
          return (
            <div
              key={`content-${index}`}
              dangerouslySetInnerHTML={{ __html: part }}
            />
          );
        }
        return null;
      })}
    </>
  );
}
