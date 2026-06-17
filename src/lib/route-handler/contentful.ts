import { createClient } from "contentful";

const ctflOptions = {
  host: `${process.env.CONTENTFUL_DOMAIN_CDN}`,
  space: `${process.env.CONTENTFUL_SPACE}`,
  environment: `${process.env.CONTENTFUL_ENV_PROD}`,
  accessToken: `${process.env.CONTENTFUL_TOKEN}`,
};

const ctflClient = createClient(ctflOptions);
