import { Fragment, ComponentType } from "react";
import { MappedHero, MappedFeature } from "@/src/lib/contentful/mapper";
// TODO: (06/23/26) Update types 'any' here
type PageComponentsProps = { components: any };

const CONTENT_TYPE_HERO = "heroBanner";
const CONTENT_TYPE_FEATURE = "featureBanner";

const componentRegistry: Record<string, ComponentType<{ fields: any }>> = {
  [CONTENT_TYPE_HERO]: MappedHero,
  [CONTENT_TYPE_FEATURE]: MappedFeature,
};

const PageComponents = ({ components }: PageComponentsProps) => {
  return (
    <>
      {components.map((component: any, index: number) => {
        const contentType = component.sys.contentType.sys.id;
        const Component = componentRegistry[contentType];

        return Component ? (
          <Component fields={component.fields} key={index} />
        ) : (
          <Fragment key={index}></Fragment>
        );
      })}
    </>
  );
};

export default PageComponents;
