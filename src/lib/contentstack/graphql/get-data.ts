import { OperationVariables, TypedDocumentNode, gql } from "@apollo/client";
import { client } from "./client";

type Data = {
  all_page: {
    items: {
      slug: string;
    }[];
  };
};

const GET_LIST_OF_PAGES: TypedDocumentNode<Data, OperationVariables> = gql`
  query GetaListofPages {
    all_page {
      items {
        slug
      }
    }
  }
`;

const { data } = await client.query({
  query: GET_LIST_OF_PAGES,
});

if (!data) {
  throw new Error("GET_LIST_OF_PAGES query returned no data");
}

export const {
  all_page: { items: pages },
} = data;
