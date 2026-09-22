import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

type Props = {
  stackId: string;
  apiKey: string;
  accessToken: string;
  environment: string;
  branch: string;
};

export const create = ({
  stackId,
  apiKey,
  accessToken,
  environment,
  branch,
}: Props): ApolloClient => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `https://graphql.contentstack.com/stacks/${stackId}?environment=${environment}`,
      headers: {
        api_key: apiKey,
        access_token: accessToken,
        branch: branch,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const env: Props = {
  stackId: "blt3237f43fdd69f9ca",
  apiKey: "blt3237f43fdd69f9ca",
  accessToken: "cs572cbcd28e28e60f18e82c4b",
  environment: "production",
  branch: "development",
};

export const client = create(env);
