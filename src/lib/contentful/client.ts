import { createClient } from "contentful";

export const ctflClient = createClient({
  host: `${process.env.CONTENTFUL_DOMAIN_CDN}`,
  space: `${process.env.CONTENTFUL_SPACE}`,
  environment: `${process.env.CONTENTFUL_ENV_PROD}`,
  accessToken: `${process.env.CONTENTFUL_TOKEN}`,
});
