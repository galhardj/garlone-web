import { OperationVariables, TypedDocumentNode, gql } from "@apollo/client";
import { client } from "./client";

type Data = {
  all_page: {
    items: {
      slug: string;
    }[];
  };
};

const GET_FOOTER: TypedDocumentNode<any, OperationVariables> = gql`
  query GetFooter {
    all_footer(limit: 1) {
      items {
        blurb
        copyright
        stats
        columns {
          title
          links {
            label
            url
          }
          _metadata {
            uid
          }
        }
      }
    }
  }
`;

const { data } = await client.query({
  query: GET_FOOTER,
});

if (!data) {
  throw new Error("GET_LIST_OF_PAGES query returned no data");
}

export const {
  all_footer: { items: footer },
} = data;
