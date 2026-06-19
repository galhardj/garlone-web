export interface Banner {
  metadata: Metadata;
  sys: Sys;
  fields: BannerFields;
}

interface Metadata {
  tags: any[];
  concepts: any[];
}

interface Sys {
  space: {
    sys: LinkSys;
  };
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: {
    sys: LinkSys;
  };
  publishedVersion: number;
  revision: number;
  contentType: {
    sys: LinkSys;
  };
  locale: string;
}

interface LinkSys {
  type: string; // "Link"
  linkType: string; // "Space" | "Environment" | "ContentType" | "Asset" | "Entry"
  id: string;
}

interface BannerFields {
  identifier: string;
  title: string;
  image: {
    sys: LinkSys;
  };
  isImageLeft: boolean;
  description: any;
  button: {
    sys: LinkSys;
  };
}
