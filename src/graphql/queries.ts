/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTest = /* GraphQL */ `query GetTest($id: ID!) {
  getTest(id: $id) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTestQueryVariables, APITypes.GetTestQuery>;
export const listTests = /* GraphQL */ `query ListTests(
  $filter: ModelTestFilterInput
  $limit: Int
  $nextToken: String
) {
  listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      test
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTestsQueryVariables, APITypes.ListTestsQuery>;
