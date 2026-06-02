/**
 * Application link component with internal/external URL handling.
 *
 * Supported href formats:
 * External URL: `https://developer.mozilla.org`
 * Absolute internal URL: `http://localhost:8099/products`
 * Absolute route: `/products`
 * Relative route: `products`
 */

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { buttonVariants, type buttonColors } from "./styles";

interface LinkProps {
  href: string;
  buttonColor?: buttonColors;
  children: ReactNode;
  className?: string;
}

const LinkButton = ({ href, buttonColor, className, children }: LinkProps) => {
  //SSR compatibility — window API doesn't exist in server
  const hostOrigin =
    typeof window !== "undefined" ? window.location.origin : "";

  const isExternalUrl = (href: string) => {
    try {
      return new URL(href).origin !== hostOrigin;
    } catch {
      return false;
    }
  };

  const style = cn(
    buttonColor && buttonVariants({ color: buttonColor }),
    className,
  );

  if (isExternalUrl(href)) {
    return (
      <a
        href={href}
        className={style}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  } else {
    const internalSlug = href.startsWith(hostOrigin)
      ? href.slice(hostOrigin.length) // get /slug
      : `${href.startsWith("/") ? "" : "/"}` + `${href}`;

    return (
      <Link href={internalSlug} className={style}>
        {children}
      </Link>
    );
  }
};

export default LinkButton;
