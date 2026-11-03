import type { Metadata } from "next";
import { foundationArticles } from "./reading-guide-foundations";
import { practiceArticles } from "./reading-guide-practice";
import { socialImageFor } from "./site-metadata";

export const GUIDE_UPDATED = "2026-11-03";
export const GUIDE_UPDATED_LABEL = "3 November 2026";
export const GUIDE_ORIGIN = "https://www.aptyread.ai";
export const guideArticles = [...foundationArticles, ...practiceArticles];
export const guideSources: Record<string, { name: string; title: string; url: string }> = {
  "ies-foundations": {
    name: "Institute of Education Sciences",
    title: "Foundational Skills to Support Reading for Understanding in Kindergarten Through 3rd Grade",
    url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/21",
  },
  "ies-comprehension": {
    name: "Institute of Education Sciences",
    title: "Improving Reading Comprehension in Kindergarten Through 3rd Grade",
    url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/14",
  },
  "dfe-reading": {
    name: "Department for Education, England",
    title: "The reading framework",
    url: "https://www.gov.uk/government/publications/the-reading-framework-teaching-the-foundations-of-literacy",
  },
  "fcrr-families": {
    name: "Florida Center for Reading Research",
    title: "Resources for families",
    url: "https://fcrr.org/families",
  },
};

export function guideArticleUrl(slug: string) {
  return slug === "the-aptyread-path" ? "/reading-guide/the-aptyread-path" : `/reading-guide/reading-problems/${slug}`;
}

export function getGuideArticle(slug: string) {
  const article = guideArticles.find((item) => item.slug === slug);
  if (!article) throw new Error(`Unknown reading guide: ${slug}`);
  return article;
}

export function guideMetadata(title: string, description: string, path: string, article = false): Metadata {
  const url = `${GUIDE_ORIGIN}${path}`;
  const image = socialImageFor(path.split("/").filter(Boolean).pop() || "reading-guide", title);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "AptyRead", type: article ? "article" : "website", images: [image], ...(article ? { modifiedTime: GUIDE_UPDATED } : {}) },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function guideArticleMetadata(slug: string) {
  const article = getGuideArticle(slug);
  return guideMetadata(article.seoTitle, article.description, guideArticleUrl(slug), true);
}
