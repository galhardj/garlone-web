import { Fragment, ComponentType } from "react";
import { MappedHero, MappedFeature } from "@/src/lib/contentful/mapper";
import {
  CONTENT_TYPE_HERO,
  CONTENT_TYPE_FEATURE,
} from "@/src/constants/contentful";

type PageComponentsProps = { components: ReferenceTo<Components>[] };

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
