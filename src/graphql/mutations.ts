/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTest = /* GraphQL */ `mutation CreateTest(
  $input: CreateTestInput!
  $condition: ModelTestConditionInput
) {
  createTest(input: $input, condition: $condition) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTestMutationVariables,
  APITypes.CreateTestMutation
>;
export const updateTest = /* GraphQL */ `mutation UpdateTest(
  $input: UpdateTestInput!
  $condition: ModelTestConditionInput
) {
  updateTest(input: $input, condition: $condition) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTestMutationVariables,
  APITypes.UpdateTestMutation
>;
export const deleteTest = /* GraphQL */ `mutation DeleteTest(
  $input: DeleteTestInput!
  $condition: ModelTestConditionInput
) {
  deleteTest(input: $input, condition: $condition) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTestMutationVariables,
  APITypes.DeleteTestMutation
>;
