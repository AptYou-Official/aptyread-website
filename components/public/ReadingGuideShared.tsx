/* eslint-disable @next/next/no-img-element -- Reuse the approved local app assets and store badges. */
import PlayStoreLink from "./PlayStoreLink";
import { GUIDE_ORIGIN, GUIDE_UPDATED, GUIDE_UPDATED_LABEL } from "@/lib/reading-guide";
import type { GuideArticle } from "@/lib/reading-guide-types";

export function GuideSchema({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function GuideArrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}

export function GuideBreadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <>
    <GuideSchema data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, ...(item.href ? { item: `${GUIDE_ORIGIN}${item.href}` } : {}) })) }} />
    <nav className="guide-breadcrumb" aria-label="Breadcrumb"><ol>{items.map((item, index) => <li key={item.label}>{index > 0 && <span aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <a href={item.href}>{item.label}</a>}</li>)}</ol></nav>
  </>;
}

export function GuideByline({
  minutes,
  updated = { date: GUIDE_UPDATED, label: GUIDE_UPDATED_LABEL },
}: {
  minutes?: number;
  updated?: { date: string; label: string };
}) {
  return <p className="guide-byline"><span>By the <a href="/about">AptyRead team</a></span><span>Updated <time dateTime={updated.date}>{updated.label}</time></span>{minutes && <span>{minutes} min read</span>}</p>;
}

export function GuideWordExample({ example }: { example: GuideArticle["example"] }) {
  return <figure className="guide-word-example">
    <p className="guide-example-label">{example.label}</p>
    <div className="guide-word-tiles" role="img" aria-label={`Read together: ${example.word}`}>{example.tiles.map((tile, index) => <span key={`${tile}-${index}`} aria-hidden="true">{tile}</span>)}</div>
    <figcaption><p className="guide-example-meaning">{example.meaning}</p><p className="guide-example-prompt">{example.prompt}</p></figcaption>
  </figure>;
}

export function GuideCta() {
  return <aside className="guide-cta support-wrap" aria-labelledby="guide-download-title">
    <img className="guide-cta-mascot" src="/homepage/apty-mascot.webp" width="180" height="180" alt="" loading="lazy" />
    <div className="guide-cta-copy">
      <p className="support-eyebrow">A little time together. A place to begin.</p>
      <h2 id="guide-download-title">Discover what a word can open.</h2>
      <p>Explore 9 lessons free, including your child’s first story.</p>
      <p className="guide-offer-detail">First 4 lessons need no account. Create a free parent account to continue through Lesson 9.</p>
      <div className="guide-store-links">
        <PlayStoreLink platform="android" aria-label="Download AptyRead on Google Play"><img src="/homepage/store-google.png" width="174" height="52" alt="Get it on Google Play" loading="lazy" /></PlayStoreLink>
        <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store"><img src="/homepage/store-apple.svg" width="155" height="52" alt="Download on the App Store" loading="lazy" /></PlayStoreLink>
      </div>
      <p className="guide-download-caption">For Android and iPhone · Ages 4–10</p>
      <p className="guide-offer-detail">No advertisements. No recurring subscription. From Lesson 10, levels are purchased separately with a one-time payment.</p>
    </div>
  </aside>;
}
