import { BaseSys, WithMetadata } from "@/src/type/contentful/base";

export interface Image extends WithMetadata {
  sys: SysAssetEntry;
  fields: FieldsImage;
}

interface SysAssetEntry extends BaseSys {
  publishedVersion: number;
  revision: number;
}

interface FieldsImage {
  title: string;
  description: string;
  file: FileImage;
}

interface FileImage {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

interface Details {
  size: number;
  image: ImageDimensions;
}

interface ImageDimensions {
  width: number;
  height: number;
}
