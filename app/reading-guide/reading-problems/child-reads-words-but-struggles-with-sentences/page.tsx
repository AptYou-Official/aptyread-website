import ReadingGuideArticle from "@/components/public/ReadingGuideArticle";
import { guideArticleMetadata } from "@/lib/reading-guide";

export const metadata = guideArticleMetadata("child-reads-words-but-struggles-with-sentences");

export default function Page() {
  return <ReadingGuideArticle slug="child-reads-words-but-struggles-with-sentences" />;
}
