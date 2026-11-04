import type { ReactNode } from "react";
import Link from "next/link";
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
    <Link className="support-wordmark" href="/" prefetch={false} aria-label="AptyRead home">
      <span>Apty</span><span>Read</span>
    </Link>
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
            <Link className="support-nav-home" href="/" prefetch={false}>Home</Link>
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
