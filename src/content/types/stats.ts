// Statistics types - shared between client and server
export type StatItem = {
  number: string | number; // Can be string or number for CountUp animation
  suffix?: string; // Optional suffix like "+", "%", etc.
  label: string;
  labelEn?: string;
  labelZh?: string;
  description?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  icon?: string | React.ReactNode; // Icon name (string) or React component
};






