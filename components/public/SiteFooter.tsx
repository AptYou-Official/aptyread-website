import Link from "next/link";
import "./site-footer.css";

type Props = {
  currentPage?: string;
  schoolsPage?: boolean;
};

const footerLinks = [
  { page: "home", href: "/", label: "Home" },
  { page: "about", href: "/about", label: "About us" },
  { page: "reading-guide", href: "/reading-guide", label: "Reading guide" },
  { page: "faq", href: "/faq", label: "FAQs" },
  { page: "contact", href: "/contact", label: "Contact" },
  { page: "schools", href: "/schools", label: "For schools" },
  { page: "privacy", href: "/privacy", label: "Privacy" },
  { page: "terms", href: "/terms", label: "Terms" },
  { page: "delete-account", href: "/delete-account", label: "Delete account" },
];

export default function SiteFooter({ currentPage, schoolsPage = false }: Props) {
  return (
    <footer className="apty-site-footer">
      <div className="apty-site-footer-inner">
        <div className="apty-site-footer-brand">
          <Link className="apty-site-footer-wordmark" href="/" prefetch={false} aria-label="AptyRead home"><span>Apty</span><span>Read</span></Link>
          <p className="apty-site-footer-mission">Every Child Reads.</p>
          <a className="apty-site-footer-download" href="/download" aria-current={currentPage === "download" ? "page" : undefined}>Download app</a>
        </div>
        <div className="apty-site-footer-details">
          <nav className="apty-site-footer-links" aria-label="Footer navigation">
            {footerLinks.map(({ page, href, label }) => <a href={href} key={page} aria-current={currentPage === page ? "page" : undefined}>{label}</a>)}
          </nav>
          {schoolsPage && <nav className="apty-site-footer-classroom" aria-label="Classroom links"><a href="https://classroom.aptyread.ai">Open Classroom</a><a href="https://classroom.aptyread.ai/#/login">School login</a></nav>}
          <p className="apty-site-footer-copyright">© 2026 AptYou Services Pvt Ltd.</p>
          <p className="apty-site-footer-trademarks">Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
}
