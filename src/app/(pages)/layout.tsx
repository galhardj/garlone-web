import type { Metadata } from "next";
import { Noto_Sans_Symbols } from "next/font/google";
import "@/src/styles/globals.css";

export const metadata: Metadata = {
  title: "My Webby",
  description: "A minimal Next.js homepage with static content",
};

const webbyFontFamily = Noto_Sans_Symbols({
  subsets: ["latin"],
  variable: "--font-family-webby",
});

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
