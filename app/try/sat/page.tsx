import type { Metadata } from "next";
import SatPreview from "./sat-preview";
import "./sat-preview.css";

export const metadata: Metadata = {
  title: "Make and read sat | AptyRead activity preview",
  description: "A short guided preview of word building, blending and meaning in AptyRead.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://www.aptyread.ai/download" },
};

export default async function SatPreviewPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  return <SatPreview embedded={query.embedded === "1"} />;
}
