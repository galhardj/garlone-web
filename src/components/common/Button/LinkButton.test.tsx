import { render, screen } from "@testing-library/react";
import LinkButton from "./LinkButton";

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <a href={href} data-testid="next-link" {...rest}>
        {children}
      </a>
    );
  };
});

describe("LinkButton", () => {
  describe("Render methods - Internal path and URL href", () => {
    it.each(["/products", "/blog/my-post", "#section"])(
      "renders <Link> for %s (Internal path)",
      (href) => {
        render(<LinkButton href={href}>Click me</LinkButton>);
        const link = screen.getByTestId("next-link");
        expect(link).toHaveAttribute("href", href);
        expect(link).not.toHaveAttribute("target");
        expect(link).not.toHaveAttribute("rel");
      },
    );

    it.each([
      "https://developer.mozilla.org",
      "https://www.pret.co.uk/en-GB/shop-finder",
      "http://example.com",
    ])("renders <a> with target/rel for %s (External URL)", (href) => {
      render(<LinkButton href={href}>Visit</LinkButton>);
      const link = screen.getByRole("link", { name: "Visit" });
      expect(link.tagName).toBe("A");
      expect(link).not.toHaveAttribute("data-testid", "next-link");
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("buttonColor validation", () => {
    it("falls back to the default color variant when buttonColor is omitted", () => {
      render(<LinkButton href="/products">Shop</LinkButton>);
      const link = screen.getByTestId("next-link");
      expect(link.className).toContain("bg-transparent");
    });

    it.each([
      ["transparent", "bg-transparent"],
      ["yellow", "bg-amber-300"],
      ["yellowDark", "bg-amber-400"],
      ["blue", "bg-blue-200"],
      ["gray", "bg-gray-600"],
    ] as const)("renders %s color variant as %s", (color, expectedClass) => {
      render(
        <LinkButton href="/products" buttonColor={color}>
          Shop
        </LinkButton>,
      );
      const link = screen.getByTestId("next-link");
      expect(link.className).toContain(expectedClass);
    });
  });

  describe("className merge with multiple util classes", () => {
    it("preserves all classes when className has multiple non-conflicting utilities (internal)", () => {
      render(
        <LinkButton
          href="/products"
          buttonColor="transparent"
          className="mt-3 inline-flex justify-center gap-2"
        >
          Shop
        </LinkButton>,
      );
      const link = screen.getByTestId("next-link");
      [
        "mt-3",
        "inline-flex",
        "justify-center",
        "gap-2",
        "bg-transparent",
      ].forEach((cls) => {
        expect(link.className).toContain(cls);
      });
    });

    it("preserves all classes when className has multiple non-conflicting utilities (external)", () => {
      render(
        <LinkButton
          href="https://developer.mozilla.org"
          buttonColor="gray"
          className="self-stretch md:self-start"
        >
          MDN
        </LinkButton>,
      );
      const link = screen.getByRole("link", { name: "MDN" });
      ["self-stretch", "md:self-start", "bg-gray-600"].forEach((cls) => {
        expect(link.className).toContain(cls);
      });
    });

    it("lets an incoming className override a conflicting base utility (e.g. margin)", () => {
      // buttonVariants base includes "mt-3" — confirm cn/tailwind-merge resolves
      // conflicts in favor of the explicitly passed className rather than duplicating both.
      render(
        <LinkButton href="/products" className="mt-0">
          Shop
        </LinkButton>,
      );
      const link = screen.getByTestId("next-link");
      expect(link.className).toContain("mt-0");
      expect(link.className).not.toMatch(/\bmt-3\b/);
    });
  });

  it("renders children content", () => {
    render(<LinkButton href="/products">Shop now</LinkButton>);
    expect(screen.getByText("Shop now")).toBeInTheDocument();
  });
});
