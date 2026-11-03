import type { ReactNode } from "react";
import "./support.css";

export type SupportPage = "contact" | "privacy" | "terms" | "delete-account" | "faq";

type Props = {
  children: ReactNode;
  currentPage: SupportPage;
  className?: string;
};

function Wordmark() {
  return (
    <a className="support-wordmark" href="/" aria-label="AptyRead home">
      <span>Apty</span><span>Read</span>
    </a>
  );
}

export default function SupportShell({ children, currentPage, className = "" }: Props) {
  return (
    <div className={`apty-support ${className}`.trim()}>
      <a className="support-skip" href="#support-main">Skip to content</a>
      <header className="support-header">
        <div className="support-nav">
          <Wordmark />
          <nav aria-label="Main navigation">
            <a className="support-nav-home" href="/">Home</a>
            <a href="/about">About us</a>
            <a href="/contact" aria-current={currentPage === "contact" ? "page" : undefined}>Contact</a>
          </nav>
        </div>
      </header>
      <main id="support-main">{children}</main>
      <footer className="support-footer support-wrap">
        <div><Wordmark /><p>Every Child Reads.</p></div>
        <div className="support-footer-right">
          <nav aria-label="Footer navigation">
            <a href="/">Home</a>
            <a href="/about">About us</a>
            <a href="/faq" aria-current={currentPage === "faq" ? "page" : undefined}>FAQs</a>
            <a href="/contact" aria-current={currentPage === "contact" ? "page" : undefined}>Contact</a>
            <a href="/privacy" aria-current={currentPage === "privacy" ? "page" : undefined}>Privacy</a>
            <a href="/terms" aria-current={currentPage === "terms" ? "page" : undefined}>Terms</a>
            <a href="/delete-account" aria-current={currentPage === "delete-account" ? "page" : undefined}>Delete account</a>
          </nav>
          <p>© 2026 AptYou Services Pvt Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
