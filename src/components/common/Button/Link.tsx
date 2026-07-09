/**
 * href formats:
 * URL as External: `https://developer.mozilla.org`
 * Path as Internal: `/products`
 * Path as Internal: `products`
 */
import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { type ButtonColors, buttonVariants } from "./styles";

type LinkProps = {
  href: string;
  buttonColor?: ButtonColors;
  children: ReactNode;
  className?: string;
};

const HAS_SCHEME = /^[a-z][a-z\d+.-]*:/i; // matches http:, https:, mailto:, tel:, etc.
function isExternalHref(href: string): boolean {
  return HAS_SCHEME.test(href);
}

const getLinkProps = (href: string) => {
  const external = isExternalHref(href);
  const externalAttrs = { target: "_blank", rel: "noopener noreferrer" };
  return {
    LinkTag: external ? "a" : Link,
    attrs: external ? externalAttrs : {},
  } as const;
};

// TODO: (07/08/2026) Consider Custom App in Contentful for Label/Icon and URL/path
const LinkButton = ({ href, buttonColor, className, children }: LinkProps) => {
  const style = cn(buttonVariants({ color: buttonColor }), className);
  const { LinkTag, attrs } = getLinkProps(href);

  return (
    <LinkTag href={href} className={style} {...attrs}>
      {children}
    </LinkTag>
  );
};

export default LinkButton;
