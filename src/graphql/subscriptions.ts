/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTest = /* GraphQL */ `subscription OnCreateTest($filter: ModelSubscriptionTestFilterInput) {
  onCreateTest(filter: $filter) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTestSubscriptionVariables,
  APITypes.OnCreateTestSubscription
>;
export const onUpdateTest = /* GraphQL */ `subscription OnUpdateTest($filter: ModelSubscriptionTestFilterInput) {
  onUpdateTest(filter: $filter) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTestSubscriptionVariables,
  APITypes.OnUpdateTestSubscription
>;
export const onDeleteTest = /* GraphQL */ `subscription OnDeleteTest($filter: ModelSubscriptionTestFilterInput) {
  onDeleteTest(filter: $filter) {
    id
    name
    description
    test
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTestSubscriptionVariables,
  APITypes.OnDeleteTestSubscription
>;
