import ReadingGuideArticle from "@/components/public/ReadingGuideArticle";
import { guideArticleMetadata } from "@/lib/reading-guide";

export const metadata = guideArticleMetadata("child-knows-alphabet-but-cant-read");

export default function Page() {
  return <ReadingGuideArticle slug="child-knows-alphabet-but-cant-read" />;
}
