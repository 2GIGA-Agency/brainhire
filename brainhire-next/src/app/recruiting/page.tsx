import type { Metadata } from "next";
import { buildStaticPageMetadata, StaticPageRenderer } from "@/lib/staticPage";

export function generateMetadata(): Metadata {
  return buildStaticPageMetadata("recruiting", "/recruiting");
}

export default function RecruitingPage() {
  return <StaticPageRenderer slug="recruiting" />;
}
