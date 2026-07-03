import { Fragment, ComponentProps } from "react";
import {
  MappedHero,
  MappedFeature,
} from "@/src/lib/contentful/mapper/components";
import {
  CONTENT_TYPE_HERO,
  CONTENT_TYPE_FEATURE,
} from "@/src/constants/contentful";
import { ComponentReference } from "@/src/type/contentful/components";

type ComponentMapperProps = { components: ComponentReference[] };
type RegistryKey = keyof typeof componentRegistry;

const componentRegistry = {
  [CONTENT_TYPE_HERO]: MappedHero,
  [CONTENT_TYPE_FEATURE]: MappedFeature,
};

function renderEntry<K extends RegistryKey>(
  contentType: K,
  component: ComponentReference,
  index: number,
) {
  type MappedComponentFields = ComponentProps<
    (typeof componentRegistry)[K]
  >["fields"];
  type MappedComponent = React.ComponentType<{
    fields: MappedComponentFields;
  }>;

  const Component = componentRegistry[contentType] as MappedComponent;
  return <Component fields={component.fields} key={index} />;
}

const ComponentMapper = ({ components }: ComponentMapperProps) => {
  return (
    <>
      {components.map((component, index) => {
        const contentType = component.sys.contentType.sys.id as RegistryKey;

        if (!(contentType in componentRegistry)) {
          return <Fragment key={index} />;
        }

        return renderEntry(contentType, component, index);
      })}
    </>
  );
};

export default ComponentMapper;
