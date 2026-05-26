import { Noto_Sans_Symbols } from "next/font/google";

export const webbyFontFamily = Noto_Sans_Symbols({
  subsets: ["latin"],
  variable: "--font-family-webby",
  fallback: ["sans-serif", "system-ui"],
});
