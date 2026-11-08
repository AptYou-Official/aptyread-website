import type { Metadata } from "next";
import Image from "next/image";
import SupportShell from "@/components/public/SupportShell";
import DownloadStoreActions from "@/components/public/DownloadStoreActions";
import MakeSatLauncher from "@/components/public/MakeSatLauncher";
import { softwareApplicationJsonLd } from "@/lib/schema";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import { downloadCopy, downloadLanguage, downloadLanguageHref } from "./download-copy";
import "./download.css";

const title = "Download AptyRead | 9 Free Reading Lessons";
const description = "Start the AptyRead English Reading Program on Android or iPhone. For ages 4–10, with 9 free lessons and a first story. First 4 lessons need no account.";
const pageUrl = "https://www.aptyread.ai/download";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title, description, url: pageUrl, siteName: "AptyRead", type: "website", images: [socialImage] },
  twitter: { card: "summary_large_image", title, description, images: [socialImageUrl] },
};

function Check() {
  return <svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m4 10 4 4 8-8" /></svg>;
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function DownloadPage({ searchParams }: Props) {
  const query = await searchParams;
  const language = downloadLanguage(query);
  const copy = downloadCopy[language];
  const otherLanguage = language === "ml" ? "en" : "ml";

  return (
    <SupportShell currentPage="download" className="apty-download-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd(pageUrl)).replace(/</g, "\\u003c") }} />
      <div className={`download-content download-content-${language}`} lang={language}>
        <section className="download-page-hero support-wrap" aria-labelledby="download-page-title">
          <div className="download-page-copy">
            <div className="download-page-topline">
              <p className="support-eyebrow">{copy.eyebrow}</p>
              <a className="download-language" lang="en" href={downloadLanguageHref(query, otherLanguage)} hrefLang={otherLanguage}>{copy.languageLabel}</a>
            </div>
            <h1 id="download-page-title">{copy.title}<br /><span>{copy.titleAccent}</span></h1>
            <p className="download-page-intro">{copy.intro}</p>
            <div className="download-page-offer"><strong>{copy.offer}</strong><span>{copy.noAccount}</span></div>
            <DownloadStoreActions language={language} />
            <MakeSatLauncher language={language} />
            <div className="download-page-reassurance"><span><Check />{copy.noAds}</span><span><Check />{copy.noSubscription}</span></div>
          </div>
          <figure className="download-page-preview">
            <p className="download-preview-label">{copy.preview}</p>
            <Image className="download-page-word-screen" src="/homepage/app-words-660.webp" width={660} height={1434} alt={copy.wordAlt} priority unoptimized />
            <figcaption>{copy.previewCaption}</figcaption>
          </figure>
        </section>
        <section className="download-page-story support-wrap" aria-labelledby="download-story-title">
          <div className="download-story-image">
            <Image src="/homepage/app-first-story-480.webp" width={480} height={1043} alt={copy.storyAlt} unoptimized />
          </div>
          <div className="download-story-copy">
            <p className="support-eyebrow">{copy.storyEyebrow}</p>
            <h2 id="download-story-title">{copy.storyTitle}</h2>
            <p>{copy.storyBody}</p>
            <p className="download-account-detail">{copy.accountDetail}</p>
            <div className="download-sequence"><h3>{copy.sequenceTitle}</h3><p>{copy.sequenceBody}</p></div>
          </div>
        </section>
        <aside className="download-page-next support-wrap" aria-labelledby="download-next-title">
          <div>
            <h2 id="download-next-title">{copy.purchaseTitle}</h2>
            <p>{copy.purchaseBody}</p>
            <a className="download-page-help" href="/faq">{copy.help}</a>
          </div>
          <DownloadStoreActions language={language} />
        </aside>
      </div>
    </SupportShell>
  );
}
