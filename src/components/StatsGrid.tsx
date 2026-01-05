"use client";

import { 
  Calendar, 
  CheckCircle2, 
  Award, 
  Globe 
} from "lucide-react";
import { StatsCard } from "./StatsCard";
import type { StatItem } from "../content/types/stats";

export type { StatItem };

// Icon mapping function - using Lucide React icons
function getIcon(iconName?: string | React.ReactNode): React.ReactNode {
  if (!iconName || typeof iconName !== "string") {
    return iconName;
  }

  const iconMap: Record<string, React.ReactNode> = {
    calendar: <Calendar className="h-7 w-7" />,
    "check-circle": <CheckCircle2 className="h-7 w-7" />,
    award: <Award className="h-7 w-7" />,
    globe: <Globe className="h-7 w-7" />,
    // Legacy icon names for backward compatibility
    patent: <Award className="h-7 w-7" />,
    products: <CheckCircle2 className="h-7 w-7" />,
    clock: <Calendar className="h-7 w-7" />,
    team: <CheckCircle2 className="h-7 w-7" />,
    chart: <Award className="h-7 w-7" />,
    book: <Award className="h-7 w-7" />,
  };

  return iconMap[iconName] || null;
}

type StatsGridProps = {
  stats: StatItem[];
  lang?: string;
  columns?: 2 | 3 | 4;
};

export function StatsGrid({ stats, lang = "en", columns = 4 }: StatsGridProps) {
  const getLocalizedLabel = (stat: StatItem) => {
    if (lang === "zh") {
      return stat.labelZh || stat.label;
    }
    return stat.labelEn || stat.label;
  };

  const getLocalizedDescription = (stat: StatItem) => {
    if (lang === "zh") {
      return stat.descriptionZh || stat.description;
    }
    return stat.descriptionEn || stat.description;
  };

  // Responsive grid: 2x2 on mobile, 4 columns on desktop
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-2 lg:grid-cols-4", // 2x2 on mobile, 4 columns on large screens
  };

  return (
    <div className={`grid gap-4 md:gap-6 ${gridCols[columns]}`}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          number={stat.number}
          suffix={stat.suffix}
          label={getLocalizedLabel(stat)}
          description={getLocalizedDescription(stat)}
          icon={getIcon(stat.icon)}
        />
      ))}
    </div>
  );
}
