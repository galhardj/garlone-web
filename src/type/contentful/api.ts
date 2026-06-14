interface ContentfulRoot {
  sys: Sys;
  total: number;
  skip: number;
  limit: number;
  items: Item[];
  includes: Includes;
}

interface Sys {
  type: string;
}

interface Item {
  metadata: Metadata;
  sys: Sys3;
  fields: Fields;
}

interface Metadata {
  tags: any[];
  concepts: Concept[];
}

interface Concept {
  sys: Sys2;
}

interface Sys2 {
  type: string;
  linkType: string;
  id: string;
}

interface Sys3 {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Environment;
  publishedVersion: number;
  revision: number;
  contentType: ContentType;
  locale: string;
}

interface Space {
  sys: Sys4;
}

interface Sys4 {
  type: string;
  linkType: string;
  id: string;
}

interface Environment {
  sys: Sys5;
}

interface Sys5 {
  id: string;
  type: string;
  linkType: string;
}

interface ContentType {
  sys: Sys6;
}

interface Sys6 {
  type: string;
  linkType: string;
  id: string;
}

interface Fields {
  identifier: string;
  slug: string;
  metadata: Metadata2;
  configuration: Configuration;
  pageComponent: PageComponent[];
}

interface Metadata2 {
  sys: Sys7;
}

interface Sys7 {
  type: string;
  linkType: string;
  id: string;
}

interface Configuration {
  sys: Sys8;
}

interface Sys8 {
  type: string;
  linkType: string;
  id: string;
}

interface PageComponent {
  sys: Sys9;
}

interface Sys9 {
  type: string;
  linkType: string;
  id: string;
}

interface Includes {
  Entry: Entry[];
  Asset: Asset[];
}

interface Entry {
  metadata: Metadata3;
  sys: Sys10;
  fields: Fields2;
}

interface Metadata3 {
  tags: any[];
  concepts: any[];
}

interface Sys10 {
  space: Space2;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Environment2;
  publishedVersion: number;
  revision: number;
  contentType: ContentType2;
  locale: string;
}

interface Space2 {
  sys: Sys11;
}

interface Sys11 {
  type: string;
  linkType: string;
  id: string;
}

interface Environment2 {
  sys: Sys12;
}

interface Sys12 {
  id: string;
  type: string;
  linkType: string;
}

interface ContentType2 {
  sys: Sys13;
}

interface Sys13 {
  type: string;
  linkType: string;
  id: string;
}

interface Fields2 {
  identifier?: string;
  title?: string;
  description: any;
  carouselItems?: CarouselItem[];
  image?: Image;
  imagePosition?: boolean;
  button?: Button;
  accordionItems?: AccordionItem[];
  callToActions?: CallToAction[];
  appDownloadsSection?: boolean;
  articles?: Article[];
  callToAction?: CallToAction2;
  header?: Header;
  footer?: Footer;
  promotion?: Promotion;
}

interface CarouselItem {
  sys: Sys14;
}

interface Sys14 {
  type: string;
  linkType: string;
  id: string;
}

interface Image {
  sys: Sys15;
}

interface Sys15 {
  type: string;
  linkType: string;
  id: string;
}

interface Button {
  sys: Sys16;
}

interface Sys16 {
  type: string;
  linkType: string;
  id: string;
}

interface AccordionItem {
  sys: Sys17;
}

interface Sys17 {
  type: string;
  linkType: string;
  id: string;
}

interface CallToAction {
  sys: Sys18;
}

interface Sys18 {
  type: string;
  linkType: string;
  id: string;
}

interface Article {
  sys: Sys19;
}

interface Sys19 {
  type: string;
  linkType: string;
  id: string;
}

interface CallToAction2 {
  sys: Sys20;
}

interface Sys20 {
  type: string;
  linkType: string;
  id: string;
}

interface Header {
  sys: Sys21;
}

interface Sys21 {
  type: string;
  linkType: string;
  id: string;
}

interface Footer {
  sys: Sys22;
}

interface Sys22 {
  type: string;
  linkType: string;
  id: string;
}

interface Promotion {
  sys: Sys23;
}

interface Sys23 {
  type: string;
  linkType: string;
  id: string;
}

interface Asset {
  metadata: Metadata4;
  sys: Sys24;
  fields: Fields3;
}

interface Metadata4 {
  tags: any[];
  concepts: any[];
}

interface Sys24 {
  space: Space3;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: Environment3;
  publishedVersion: number;
  revision: number;
  locale: string;
}

interface Space3 {
  sys: Sys25;
}

interface Sys25 {
  type: string;
  linkType: string;
  id: string;
}

interface Environment3 {
  sys: Sys26;
}

interface Sys26 {
  id: string;
  type: string;
  linkType: string;
}

interface Fields3 {
  title: string;
  file: File;
}

interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

interface Details {
  size: number;
  image: Image2;
}

interface Image2 {
  width: number;
  height: number;
}

export default ContentfulRoot;
