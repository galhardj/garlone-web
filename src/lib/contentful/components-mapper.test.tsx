import { render, screen } from "@testing-library/react";
import {
  CONTENT_TYPE_FEATURE,
  CONTENT_TYPE_HERO,
} from "@/src/constants/contentful";
import { MappedFeature, MappedHero } from "@/src/lib/contentful/mapper";
import type { ComponentReference } from "@/src/type/contentful/components";
import ComponentMapper from "./components-mapper";

jest.mock("@/src/lib/contentful/mapper", () => ({
  MappedHero: jest.fn(({ fields }: { fields: { title: string } }) => (
    <div data-testid="mapped-hero">{fields.title}</div>
  )),
  MappedFeature: jest.fn(({ fields }: { fields: { title: string } }) => (
    <div data-testid="mapped-feature">{fields.title}</div>
  )),
}));

const mockedMappedHero = MappedHero as jest.MockedFunction<typeof MappedHero>;
const mockedMappedFeature = MappedFeature as jest.MockedFunction<
  typeof MappedFeature
>;

const createComponentReference = (
  contentType: string,
  fields: Record<string, unknown>,
): ComponentReference =>
  ({
    metadata: {},
    sys: {
      contentType: {
        sys: { id: contentType },
      },
    },
    fields,
  }) as unknown as ComponentReference;

describe("ComponentMapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders MappedHero for hero content type", () => {
    const heroFields = { title: "Hero Title" };
    const components = [
      createComponentReference(CONTENT_TYPE_HERO, heroFields),
    ];

    render(<ComponentMapper components={components} />);

    expect(screen.getByTestId("mapped-hero")).toHaveTextContent("Hero Title");
    expect(mockedMappedHero).toHaveBeenCalledTimes(1);
    expect(mockedMappedHero.mock.calls[0][0]).toEqual({ fields: heroFields });
    expect(mockedMappedFeature).not.toHaveBeenCalled();
  });

  it("renders MappedFeature for feature content type", () => {
    const featureFields = { title: "Feature Title" };
    const components = [
      createComponentReference(CONTENT_TYPE_FEATURE, featureFields),
    ];

    render(<ComponentMapper components={components} />);

    expect(screen.getByTestId("mapped-feature")).toHaveTextContent(
      "Feature Title",
    );
    expect(mockedMappedFeature).toHaveBeenCalledTimes(1);
    expect(mockedMappedFeature.mock.calls[0][0]).toEqual({
      fields: featureFields,
    });
    expect(mockedMappedHero).not.toHaveBeenCalled();
  });

  it("renders nothing for unknown content type", () => {
    const components = [
      createComponentReference("unknownType", { title: "Unknown" }),
    ];

    const { container } = render(<ComponentMapper components={components} />);

    expect(container).toBeEmptyDOMElement();
    expect(mockedMappedHero).not.toHaveBeenCalled();
    expect(mockedMappedFeature).not.toHaveBeenCalled();
  });

  it("renders multiple registered components in order", () => {
    const heroFields = { title: "Hero Title" };
    const featureFields = { title: "Feature Title" };
    const components = [
      createComponentReference(CONTENT_TYPE_HERO, heroFields),
      createComponentReference(CONTENT_TYPE_FEATURE, featureFields),
      createComponentReference("unknownType", { title: "Skipped" }),
    ];

    render(<ComponentMapper components={components} />);

    const mappedComponents = screen.getAllByTestId(/mapped-/);
    expect(mappedComponents).toHaveLength(2);
    expect(mappedComponents[0]).toHaveTextContent("Hero Title");
    expect(mappedComponents[1]).toHaveTextContent("Feature Title");
    expect(mockedMappedHero).toHaveBeenCalledTimes(1);
    expect(mockedMappedFeature).toHaveBeenCalledTimes(1);
  });
});
