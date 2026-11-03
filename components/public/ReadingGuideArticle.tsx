import SupportShell from "./SupportShell";
import { GuideArrow, GuideBreadcrumb, GuideByline, GuideCta, GuideSchema, GuideWordExample } from "./ReadingGuideShared";
import { getGuideArticle, guideArticleUrl, guideSources, GUIDE_ORIGIN, GUIDE_UPDATED } from "@/lib/reading-guide";
import { socialImageFor } from "@/lib/site-metadata";
import "@/app/reading-guide/reading-guide.css";

export default function ReadingGuideArticle({ slug }: { slug: string }) {
  const article = getGuideArticle(slug);
  const contents = [...article.sections.map(({ id, title }) => ({ id, title })), { id: "in-aptyread", title: "How this connects with AptyRead" }, { id: "sources", title: "Sources and further reading" }];
  const links = <ul>{contents.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ul>;
  return <SupportShell currentPage="reading-guide" className="reading-guide-page">
    <GuideSchema data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, dateModified: GUIDE_UPDATED, author: { "@type": "Organization", name: "AptyRead team", url: `${GUIDE_ORIGIN}/about` }, publisher: { "@type": "Organization", name: "AptyRead", url: GUIDE_ORIGIN }, mainEntityOfPage: `${GUIDE_ORIGIN}${guideArticleUrl(slug)}`, image: socialImageFor(article.slug, article.title).url, inLanguage: "en", citation: article.sourceIds.map((id) => guideSources[id].url) }} />
    <div className="support-wrap">
      <GuideBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Reading guide", href: "/reading-guide" }, { label: article.eyebrow, href: guideArticleUrl(slug) }]} />
      <header className="guide-page-header guide-article-header">
        <p className="support-eyebrow">{article.eyebrow}</p>
        <h1>{article.title}</h1>
        <p className="guide-intro">{article.intro}</p>
        <GuideByline minutes={article.readMinutes} />
      </header>
      <div className="guide-article-layout">
        <aside className="guide-contents"><p className="support-eyebrow">In this guide</p><nav aria-label="In this guide">{links}</nav><a className="guide-back-link" href="/reading-guide">All reading guides <GuideArrow /></a></aside>
        <article className="guide-prose" aria-label={article.title}>
          <aside className="guide-answer"><h2>A helpful place to start</h2><p>{article.answer}</p></aside>
          <details className="guide-mobile-contents"><summary>In this guide <span aria-hidden="true">+</span></summary><nav aria-label="In this guide">{links}</nav></details>
          <GuideWordExample example={article.example} />
          {article.sections.map((section) => <section className="guide-prose-section" id={section.id} key={section.id}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.steps && <ol className="guide-steps">{section.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>}
            {section.bullets && <ul className="guide-bullets">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.sourceIds && <p className="guide-section-sources">Reading behind this guidance: {section.sourceIds.map((id, index) => <span key={id}>{index > 0 && "; "}<a href={`#source-${id}`}>{guideSources[id].name}</a></span>)}</p>}
          </section>)}
          <section className="guide-app-connection" id="in-aptyread"><p className="support-eyebrow">Inside AptyRead</p><h2>Put the learning into practice.</h2><p>{article.aptyConnection}</p><a className="guide-text-link" href="/reading-guide/the-aptyread-path">Explore the five-level journey <GuideArrow /></a></section>
          <section className="guide-sources" id="sources"><h2>Sources and further reading</h2><p>These resources inform the general reading guidance. The home activities are examples from the AptyRead team.</p><ul>{article.sourceIds.map((id) => <li key={id} id={`source-${id}`}><span>{guideSources[id].name}</span><a href={guideSources[id].url}>{guideSources[id].title} <GuideArrow /></a></li>)}</ul></section>
        </article>
      </div>
      <section className="guide-related"><div className="guide-section-heading"><p className="support-eyebrow">Keep exploring</p><h2>A little more help, when you need it.</h2></div><div className="guide-related-grid">{article.relatedSlugs.map((related) => {
        const isPath = related === "the-aptyread-path";
        const item = isPath ? null : getGuideArticle(related);
        return <a key={related} href={guideArticleUrl(related)}><span>{isPath ? "The AptyRead journey" : item!.eyebrow}</span><h3>{isPath ? "Five levels. One connected reading journey." : item!.title}</h3><GuideArrow /></a>;
      })}</div></section>
    </div>
    <GuideCta />
  </SupportShell>;
}
