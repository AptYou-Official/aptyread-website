import type { Metadata } from "next";
import Image from "next/image";
import SupportShell from "@/components/public/SupportShell";
import { socialImage, socialImageUrl } from "@/lib/site-metadata";
import "./contact.css";

const title = "Contact AptyRead | We’re here to help";
const description =
  "Get help with AptyRead lessons, sign-in, purchases or your family account. Find support and general contact details, plus useful starting points.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.aptyread.ai/contact" },
  openGraph: {
    title,
    description,
    url: "https://www.aptyread.ai/contact",
    siteName: "AptyRead",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImageUrl],
  },
};

function ContactArrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <rect x="4" y="7" width="24" height="18" rx="4" />
      <path d="m5 9 11 8L27 9" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <SupportShell currentPage="contact" className="contact-page">
      <section className="contact-hero support-wrap" aria-labelledby="contact-title">
        <div>
          <p className="support-eyebrow">Contact AptyRead</p>
          <h1 id="contact-title">A little help.<br /><span>A real conversation.</span></h1>
          <p className="contact-intro">From your child’s first lesson to questions about your account, we’re here to help.</p>
        </div>
        <div className="contact-hero-visual" aria-hidden="true">
          <Image src="/homepage/apty-mascot.webp" alt="" width={180} height={180} unoptimized />
        </div>
      </section>

      <section className="contact-routes support-wrap" aria-label="Ways to get in touch">
        <div className="contact-route contact-route-support">
          <span className="contact-mail-icon"><MailIcon /></span>
          <p className="contact-route-label">For parents and families</p>
          <h2>Help with AptyRead</h2>
          <p>Lessons, sign-in, purchases or your family account.</p>
          <a className="contact-email" href="mailto:support@aptyread.ai"><span>support@aptyread.ai</span><ContactArrow diagonal /></a>
        </div>
        <div className="contact-route contact-route-general">
          <span className="contact-mail-icon"><MailIcon /></span>
          <p className="contact-route-label">For other conversations</p>
          <h2>Something to share?</h2>
          <p>Schools, partnerships, press or a note for the team.</p>
          <a className="contact-email" href="mailto:contact@aptyread.ai"><span>contact@aptyread.ai</span><ContactArrow diagonal /></a>
        </div>
      </section>

      <aside className="contact-details support-wrap" aria-labelledby="contact-details-title">
        <h2 id="contact-details-title">A few details can help.</h2>
        <p>For an app issue, mention whether you use Android or iPhone, the lesson or screen you were on, and what happened. That gives us a useful place to start.</p>
      </aside>

      <section className="contact-links support-wrap" aria-labelledby="contact-links-title">
        <div className="contact-links-intro">
          <p className="support-eyebrow">A place to begin</p>
          <h2 id="contact-links-title">Useful starting points.</h2>
        </div>
        <div className="contact-link-list">
          <a href="/faq">
            <span><strong>Questions parents ask</strong><span>Free lessons, getting started and learning together.</span></span>
            <ContactArrow />
          </a>
          <a href="/delete-account">
            <span><strong>Account and reader removal</strong><span>Steps to remove a reader or delete a family account.</span></span>
            <ContactArrow />
          </a>
          <a href="/privacy">
            <span><strong>Your family’s information</strong><span>How we handle account details, learning progress and data.</span></span>
            <ContactArrow />
          </a>
        </div>
      </section>

      <div className="contact-social support-wrap">
        <p>More from AptyRead</p>
        <div>
          <a href="https://www.instagram.com/aptyread" target="_blank" rel="noopener noreferrer">Instagram <ContactArrow diagonal /></a>
          <a href="https://www.youtube.com/@aptyread" target="_blank" rel="noopener noreferrer">YouTube <ContactArrow diagonal /></a>
        </div>
      </div>
    </SupportShell>
  );
}
