import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { render, screen } from "@testing-library/react";
import RichText from "./RichText";

jest.mock("@contentful/rich-text-react-renderer", () => ({
  documentToReactComponents: jest.fn((doc: unknown) => (
    <span data-testid="rendered-document">{JSON.stringify(doc)}</span>
  )),
}));

const mockDocumentToReactComponents = documentToReactComponents as jest.Mock;

const fakeDocument = {
  nodeType: "document",
  data: {},
  content: [],
} as unknown as Document;

describe("RichText", () => {
  beforeEach(() => {
    mockDocumentToReactComponents.mockClear();
  });

  describe("when text is a plain string", () => {
    it("renders a <p> element containing the text", () => {
      render(<RichText text="Hello world" className="" />);
      const el = screen.getByText("Hello world");
      expect(el.tagName).toBe("P");
    });

    it("does not apply the multi-paragraph spacing class", () => {
      render(<RichText text="Hello world" className="" />);
      const el = screen.getByText("Hello world");
      expect(el.className).not.toContain("mb-3");
    });

    it("does not call documentToReactComponents", () => {
      render(<RichText text="Hello world" className="" />);
      expect(mockDocumentToReactComponents).not.toHaveBeenCalled();
    });

    it("merges the passed className onto the <p>", () => {
      render(<RichText text="Hello world" className="text-lg" />);
      expect(screen.getByText("Hello world")).toHaveClass("text-lg");
    });
  });

  describe("when text is a Contentful Document", () => {
    it("renders a <div> wrapper", () => {
      render(<RichText text={fakeDocument} className="" />);
      const el = screen.getByTestId("rendered-document").parentElement;
      expect(el?.tagName).toBe("DIV");
    });

    it("applies the [&_p:not(:last-child)]:mb-3 spacing class", () => {
      render(<RichText text={fakeDocument} className="" />);
      const el = screen.getByTestId("rendered-document").parentElement;
      expect(el?.className).toContain("mb-3");
    });

    it("calls documentToReactComponents with the document", () => {
      render(<RichText text={fakeDocument} className="" />);
      expect(mockDocumentToReactComponents).toHaveBeenCalledWith(fakeDocument);
    });

    it("merges the passed className alongside the spacing class", () => {
      render(<RichText text={fakeDocument} className="text-lg" />);
      const el = screen.getByTestId("rendered-document").parentElement;
      expect(el).toHaveClass("text-lg");
      expect(el?.className).toContain("mb-3");
    });
  });

  describe("className conflict resolution (twMerge via cn)", () => {
    it("lets a conflicting passed className win over the built-in margin utility", () => {
      render(
        <RichText
          text={fakeDocument}
          className="[&_p:not(:last-child)]:mb-8"
        />,
      );
      const el = screen.getByTestId("rendered-document").parentElement;
      expect(el?.className).toContain("mb-8");
      expect(el?.className).not.toContain("mb-3");
    });
  });
});
