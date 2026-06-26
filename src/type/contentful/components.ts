import { ReferenceTo } from "@/src/type/contentful/base";
import { Image } from "@/src/type/contentful/image";
import { Document } from "@contentful/rich-text-types";

export type Components = Hero | Feature;
export type ComponentReference = ReferenceTo<Components>;

export interface Page {
  identifier: string;
  slug: string;
  metadata: ReferenceTo<PageMetadata>;
  configuration: ReferenceTo<PageConfiguration>;
  components: ReferenceTo<Components>[];
}

interface PageMetadata {
  identifier: string;
  title: string;
  description: string;
}

interface PageConfiguration {
  identifier: string;
  header: ReferenceTo<Record<string, unknown>>;
  footer: ReferenceTo<Record<string, unknown>>;
}

export interface Hero {
  identifier: string;
  title: string;
  image: Image;
  description: Document;
  callToActions: ReferenceTo<CallToAction>[];
  appDownloadsSection?: boolean;
}

export interface Feature {
  identifier: string;
  title: string;
  image: Image;
  description: Document;
  isImageLeftSide: boolean;
  button?: ReferenceTo<CallToAction>;
}

interface CallToAction {
  name: string;
  label: string;
  url: string;
}
