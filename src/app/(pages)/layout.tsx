import type { Metadata } from "next";
import { webbyFontFamily } from "@/src/styles";
import "@/src/styles/globals.css";

export const metadata: Metadata = {
  title: "My Webby",
  description: "A minimal Next.js homepage with static content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${webbyFontFamily.variable}`}>
      <body className="font-family-webby text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
