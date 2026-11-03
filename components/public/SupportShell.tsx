import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import "./support.css";

export type SupportPage = "contact" | "privacy" | "terms" | "delete-account" | "faq" | "reading-guide" | "download";

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
      <SiteFooter currentPage={currentPage === "reading-guide" ? undefined : currentPage} />
    </div>
  );
}
