import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function SchoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        html,
        body {
          background-color: #ffffff;
        }
      `}</style>
      {children}
    </>
  );
}
