import { render } from "@testing-library/react";
import { MappedFeature, MappedHero } from "./components";
import Hero from "@/src/components/common/Hero";
import Feature from "@/src/components/common/Feature";
import type {
  Hero as HeroFields,
  Feature as FeatureFields,
} from "@/src/type/contentful/components";
import type { Document } from "@contentful/rich-text-types";

jest.mock("@/src/components/common/Hero", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="hero" />),
}));

jest.mock("@/src/components/common/Feature", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="feature" />),
}));

const mockedHero = Hero as jest.MockedFunction<typeof Hero>;
const mockedFeature = Feature as jest.MockedFunction<typeof Feature>;

const mockDescription = { nodeType: "document" } as Document;

const createImageField = (url: string, alt: string) => ({
  fields: {
    file: { url },
    description: alt,
  },
});

const createCallToAction = (label: string, url: string) => ({
  fields: {
    label,
    url,
  },
});

describe("MappedHero", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("maps contentful hero fields to Hero props", () => {
    const fields = {
      identifier: "hero-1",
      title: "Hero Title",
      description: mockDescription,
      image: createImageField("//images.ctfassets.net/hero.jpg", "Hero alt"),
      callToActions: [createCallToAction("Learn more", "/learn")],
    } as HeroFields;

    render(<MappedHero fields={fields} />);

    expect(mockedHero).toHaveBeenCalledWith(
      {
        image: {
          src: "//images.ctfassets.net/hero.jpg",
          alt: "Hero alt",
        },
        title: "Hero Title",
        description: mockDescription,
        link: {
          url: "/learn",
          text: "Learn more",
        },
      },
      undefined,
    );
  });
});

describe("MappedFeature", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("maps contentful feature fields to Feature props with button", () => {
    const fields = {
      identifier: "feature-1",
      title: "Feature Title",
      description: mockDescription,
      isImageLeftSide: true,
      image: createImageField(
        "//images.ctfassets.net/feature.jpg",
        "Feature alt",
      ),
      button: createCallToAction("Get started", "/start"),
    } as FeatureFields;

    render(<MappedFeature fields={fields} />);

    expect(mockedFeature).toHaveBeenCalledWith(
      {
        isImageLeftSide: true,
        image: {
          src: "//images.ctfassets.net/feature.jpg",
          alt: "Feature alt",
        },
        title: "Feature Title",
        description: mockDescription,
        button: {
          label: "Get started",
          href: "/start",
        },
      },
      undefined,
    );
  });

  it("omits button when button field is not provided", () => {
    const fields = {
      identifier: "feature-2",
      title: "Feature Without Button",
      description: mockDescription,
      isImageLeftSide: false,
      image: createImageField(
        "//images.ctfassets.net/feature-2.jpg",
        "Alt text",
      ),
    } as FeatureFields;

    render(<MappedFeature fields={fields} />);

    expect(mockedFeature).toHaveBeenCalledWith(
      {
        isImageLeftSide: false,
        image: {
          src: "//images.ctfassets.net/feature-2.jpg",
          alt: "Alt text",
        },
        title: "Feature Without Button",
        description: mockDescription,
      },
      undefined,
    );
    expect(mockedFeature.mock.calls[0][0]).not.toHaveProperty("button");
  });
});
