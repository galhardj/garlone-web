import { Page } from "@/src/type/contentful/components";
import { ReferenceTo, Includes } from "@/src/type/contentful/base";

export { type ReferenceTo } from "@/src/type/contentful/base";
export { type Components } from "@/src/type/contentful/components";

export interface ContentfulRoot {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: ReferenceTo<Page>[];
  includes: Includes;
}
