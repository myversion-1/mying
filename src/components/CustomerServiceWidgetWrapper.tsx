"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false must be in a Client Component
const CustomerServiceWidget = dynamic(
  () => import("./CustomerServiceWidget").then((mod) => ({ default: mod.CustomerServiceWidget })),
  {
    ssr: false, // Customer service widget doesn't need SSR
  }
);

export function CustomerServiceWidgetWrapper() {
  return <CustomerServiceWidget />;
}











