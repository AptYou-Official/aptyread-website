import ReadingGuideArticle from "@/components/public/ReadingGuideArticle";
import { guideArticleMetadata } from "@/lib/reading-guide";

export const metadata = guideArticleMetadata("knows-letter-sounds-but-cant-read-words");

export default function Page() {
  return <ReadingGuideArticle slug="knows-letter-sounds-but-cant-read-words" />;
}
