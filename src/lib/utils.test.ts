import { cn, normalizeUrl } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resolves conflicting tailwind classes (last wins)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("px-2", false, undefined, null, "py-1")).toBe("px-2 py-1");
  });
});

describe("normalizeUrl", () => {
  it("trims whitespace", () => {
    expect(normalizeUrl("  https://example.com  ")).toBe("https://example.com");
  });

  it("converts a protocol-relative URL to https", () => {
    expect(normalizeUrl("//images.ctfassets.net/abc.png")).toBe(
      "https://images.ctfassets.net/abc.png",
    );
  });

  it("prepends https:// when no protocol is present", () => {
    expect(normalizeUrl("example.com/path")).toBe("https://example.com/path");
  });

  it("leaves an existing https:// URL unchanged", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("throws on empty string", () => {
    expect(() => normalizeUrl("   ")).toThrow("Url must not be empty");
  });

  it("throws a descriptive error for an unparseable URL", () => {
    expect(() => normalizeUrl("not a url at all!!")).toThrow(
      `"not a url at all!!" could not be converted to a valid URL`,
    );
  });
});
