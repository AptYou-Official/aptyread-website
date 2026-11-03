import SiteFooter from "./SiteFooter";

export default function Footer({ schoolsPage = false }: { schoolsPage?: boolean }) {
  return <SiteFooter schoolsPage={schoolsPage} currentPage={schoolsPage ? "schools" : undefined} />;
}
