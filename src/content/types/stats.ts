// Statistics types - shared between client and server
export type StatItem = {
  number: string;
  label: string;
  labelEn?: string;
  labelZh?: string;
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  icon?: string | React.ReactNode;
};

