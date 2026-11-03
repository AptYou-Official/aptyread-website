import type { ReactNode } from "react";
import SupportShell from "./SupportShell";
import type { SupportPage } from "./SupportShell";

export type PolicySection = { id: string; label: string };

function ContentsLinks({ items }: { items: PolicySection[] }) {
  return (
    <nav aria-label="On this page">
      <ul>
        {items.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
      </ul>
    </nav>
  );
}

export function PolicyContents({ items }: { items: PolicySection[] }) {
  return (
    <details className="legal-mobile-contents">
      <summary>
        <span>On this page</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6" /></svg>
      </summary>
      <ContentsLinks items={items} />
    </details>
  );
}

export default function PolicyLayout({
  children,
  currentPage,
  contents,
}: {
  children: ReactNode;
  currentPage: Extract<SupportPage, "privacy" | "terms" | "delete-account">;
  contents: PolicySection[];
}) {
  return (
    <SupportShell currentPage={currentPage} className={currentPage === "delete-account" ? "account-help-page" : "policy-page"}>
      <div className="legal-layout support-wrap">
        <aside className="legal-sidebar">
          <div className="legal-sidebar-inner">
            <p className="support-eyebrow">On this page</p>
            <ContentsLinks items={contents} />
            <a className="legal-support-link" href="/contact">Contact support</a>
          </div>
        </aside>
        {children}
      </div>
    </SupportShell>
  );
}
