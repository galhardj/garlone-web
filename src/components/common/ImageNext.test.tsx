import Image from "next/image";
import { render } from "@testing-library/react";
import { cn, normalizeUrl } from "@/src/lib/utils";
import ImageNext from "./ImageNext";

jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock("@/src/lib/utils", () => ({
  cn: jest.fn((...args: unknown[]) => args.filter(Boolean).join(" ")),
  normalizeUrl: jest.fn((url: string) => `normalized:${url}`),
}));

const mockImage = Image as unknown as jest.Mock;
const mockCn = cn as jest.Mock;
const mockNormalizeUrl = normalizeUrl as jest.Mock;

describe("ImageNext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("src' imagePath", () => {
    it("normalizes a remote src", () => {
      render(<ImageNext src="https://cdn.contentful.com/foo.jpg" alt="foo" />);

      expect(mockNormalizeUrl).toHaveBeenCalledWith(
        "https://cdn.contentful.com/foo.jpg",
      );
      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({
          src: "normalized:https://cdn.contentful.com/foo.jpg",
        }),
        undefined,
      );
    });

    it("does not normalize a local image path", () => {
      render(<ImageNext src="/images/foo.jpg" alt="foo" />);

      expect(mockNormalizeUrl).not.toHaveBeenCalled();
      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({ src: "/images/foo.jpg" }),
        undefined,
      );
    });
  });

  it("forwards alt text", () => {
    render(<ImageNext src="/images/foo.jpg" alt="a foo image" />);

    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ alt: "a foo image" }),
      undefined,
    );
  });

  it("merges className with object-center via cn", () => {
    render(
      <ImageNext src="/images/foo.jpg" alt="foo" className="object-contain" />,
    );

    expect(mockCn).toHaveBeenCalledWith("object-contain", "object-center");
    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ className: "object-contain object-center" }),
      undefined,
    );
  });

  it("defaults fill to true", () => {
    render(<ImageNext src="/images/foo.jpg" alt="foo" />);

    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ fill: true }),
      undefined,
    );
  });

  describe("sizes variants", () => {
    it("resolves a known sizes key to its media query string", () => {
      render(<ImageNext src="/images/foo.jpg" alt="foo" sizes="halfWidth" />);

      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({ sizes: "(max-width: 768px) 100vw, 50vw" }),
        undefined,
      );
    });

    it("passes sizes as undefined when not provided", () => {
      render(<ImageNext src="/images/foo.jpg" alt="foo" />);

      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({ sizes: undefined }),
        undefined,
      );
    });
  });

  describe(".gif files", () => {
    it("marks .gif sources as unoptimized", () => {
      render(<ImageNext src="/images/loading.gif" alt="loading" />);

      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({ unoptimized: true }),
        undefined,
      );
    });

    it("does not mark non-gif sources as unoptimized", () => {
      render(<ImageNext src="/images/foo.jpg" alt="foo" />);

      expect(mockImage).toHaveBeenCalledWith(
        expect.objectContaining({ unoptimized: false }),
        undefined,
      );
    });
  });

  it("spreads extra props (e.g. priority) onto next/image", () => {
    render(<ImageNext src="/images/foo.jpg" alt="foo" priority />);

    expect(mockImage).toHaveBeenCalledWith(
      expect.objectContaining({ priority: true }),
      undefined,
    );
  });
});
