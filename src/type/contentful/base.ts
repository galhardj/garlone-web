import { Image } from "@/src/type/contentful/image";

interface SysId {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export interface BaseSys {
  space: SysId;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: SysId;
  locale: string;
}

interface SysEntry extends BaseSys {
  publishedVersion: number;
  revision: number;
  contentType: SysId;
}

export interface WithMetadata {
  metadata: any;
}

export interface ReferenceTo<
  T extends Record<string, any>,
> extends WithMetadata {
  sys: SysEntry;
  fields: T;
}

export interface Includes {
  Entry?: ReferenceTo<Record<string, unknown>>[];
  Asset?: Image[];
}
