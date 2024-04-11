/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createComments = /* GraphQL */ `mutation CreateComments(
  $input: CreateCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  createComments(input: $input, condition: $condition) {
    id
    comment
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentsMutationVariables,
  APITypes.CreateCommentsMutation
>;
export const updateComments = /* GraphQL */ `mutation UpdateComments(
  $input: UpdateCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  updateComments(input: $input, condition: $condition) {
    id
    comment
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentsMutationVariables,
  APITypes.UpdateCommentsMutation
>;
export const deleteComments = /* GraphQL */ `mutation DeleteComments(
  $input: DeleteCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  deleteComments(input: $input, condition: $condition) {
    id
    comment
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentsMutationVariables,
  APITypes.DeleteCommentsMutation
>;
export const createProject = /* GraphQL */ `mutation CreateProject(
  $input: CreateProjectInput!
  $condition: ModelProjectConditionInput
) {
  createProject(input: $input, condition: $condition) {
    id
    userId
    name
    description
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProjectMutationVariables,
  APITypes.CreateProjectMutation
>;
export const updateProject = /* GraphQL */ `mutation UpdateProject(
  $input: UpdateProjectInput!
  $condition: ModelProjectConditionInput
) {
  updateProject(input: $input, condition: $condition) {
    id
    userId
    name
    description
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProjectMutationVariables,
  APITypes.UpdateProjectMutation
>;
export const deleteProject = /* GraphQL */ `mutation DeleteProject(
  $input: DeleteProjectInput!
  $condition: ModelProjectConditionInput
) {
  deleteProject(input: $input, condition: $condition) {
    id
    userId
    name
    description
    content
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProjectMutationVariables,
  APITypes.DeleteProjectMutation
>;
