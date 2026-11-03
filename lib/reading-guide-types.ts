export type GuideArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  intro: string;
  answer: string;
  readMinutes: number;
  example: { label: string; tiles: string[]; word: string; meaning: string; prompt: string };
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    steps?: { title: string; text: string }[];
    bullets?: string[];
    sourceIds?: string[];
  }[];
  aptyConnection: string;
  relatedSlugs: string[];
  sourceIds: string[];
};
