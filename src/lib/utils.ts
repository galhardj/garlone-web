import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeUrl(url: string) {
  let trimmed = url.trim();
  if (!trimmed) throw new Error("Url must not be empty");

  const normalized = trimmed
    .replace(/^\/\//, "https://") // remove slashes prefix from //images.ctfassets.net
    .replace(/^(https?:\/\/)?/, "https://"); // add https:// to the start

  try {
    new URL(normalized);
  } catch {
    throw new Error(`"${url}" could not be converted to a valid URL`);
  }

  return normalized;
}
