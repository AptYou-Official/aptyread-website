import ReadingGuideArticle from "@/components/public/ReadingGuideArticle";
import { guideArticleMetadata } from "@/lib/reading-guide";

export const metadata = guideArticleMetadata("how-to-teach-child-to-blend-sounds");

export default function Page() {
  return <ReadingGuideArticle slug="how-to-teach-child-to-blend-sounds" />;
}
