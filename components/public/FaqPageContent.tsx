import { faqGroups } from "@/lib/faq-content";

export default function FaqPageContent() {
  return (
    <div className="faq-page-layout support-wrap">
      <aside className="faq-page-navigation">
        <p className="support-eyebrow">Find your answer</p>
        <nav aria-label="Question topics">
          {faqGroups.map((group, index) => (
            <a key={group.id} href={`#${group.id}`}>
              <span aria-hidden="true">0{index + 1}</span>{group.title}
            </a>
          ))}
        </nav>
        <a className="faq-page-contact-link" href="/contact">A question of your own? <span>We’re here to help.</span></a>
      </aside>
      <div className="faq-page-groups">
        {faqGroups.map((group, index) => (
          <section className="faq-page-group" id={group.id} key={group.id} tabIndex={-1} aria-labelledby={`${group.id}-title`}>
            <div className="faq-page-group-heading">
              <span aria-hidden="true">0{index + 1}</span>
              <div><h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.description}</p></div>
            </div>
            <div className="faq-page-questions">
              {group.items.map((item) => (
                <details className="faq-page-question" key={item.id} id={item.id} open={item.id === "free-lessons"}>
                  <summary>
                    <h3>{item.question}</h3>
                    <svg className="faq-page-toggle" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M5 12h14" /><path className="faq-page-toggle-vertical" d="M12 5v14" /></svg>
                  </summary>
                  <div className="faq-page-answer">
                    <p>{item.answer}</p>
                    {item.link && <a href={item.link.href}>{item.link.label}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></a>}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
