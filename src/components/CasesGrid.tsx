"use client";

import { CaseCard } from "./CaseCard";
import type { CaseItem } from "../content/types/case";

type CasesGridProps = {
  cases: CaseItem[];
  onCaseClick?: (caseItem: CaseItem) => void;
};

export function CasesGrid({ cases, onCaseClick }: CasesGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          onClick={() => onCaseClick?.(caseItem)}
        />
      ))}
    </div>
  );
}








