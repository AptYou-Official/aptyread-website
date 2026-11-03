import ReadingGuideArticle from "@/components/public/ReadingGuideArticle";
import { guideArticleMetadata } from "@/lib/reading-guide";

export const metadata = guideArticleMetadata("how-to-help-child-who-struggles-with-reading");

export default function Page() {
  return <ReadingGuideArticle slug="how-to-help-child-who-struggles-with-reading" />;
}
