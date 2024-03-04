/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTestInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  test?: string | null,
};

export type ModelTestConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  test?: ModelStringInput | null,
  and?: Array< ModelTestConditionInput | null > | null,
  or?: Array< ModelTestConditionInput | null > | null,
  not?: ModelTestConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Test = {
  __typename: "Test",
  id: string,
  name: string,
  description?: string | null,
  test?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTestInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  test?: string | null,
};

export type DeleteTestInput = {
  id: string,
};

export type ModelTestFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  test?: ModelStringInput | null,
  and?: Array< ModelTestFilterInput | null > | null,
  or?: Array< ModelTestFilterInput | null > | null,
  not?: ModelTestFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTestConnection = {
  __typename: "ModelTestConnection",
  items:  Array<Test | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTestFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  test?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTestFilterInput | null > | null,
  or?: Array< ModelSubscriptionTestFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateTestMutationVariables = {
  input: CreateTestInput,
  condition?: ModelTestConditionInput | null,
};

export type CreateTestMutation = {
  createTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTestMutationVariables = {
  input: UpdateTestInput,
  condition?: ModelTestConditionInput | null,
};

export type UpdateTestMutation = {
  updateTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTestMutationVariables = {
  input: DeleteTestInput,
  condition?: ModelTestConditionInput | null,
};

export type DeleteTestMutation = {
  deleteTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTestQueryVariables = {
  id: string,
};

export type GetTestQuery = {
  getTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTestsQueryVariables = {
  filter?: ModelTestFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTestsQuery = {
  listTests?:  {
    __typename: "ModelTestConnection",
    items:  Array< {
      __typename: "Test",
      id: string,
      name: string,
      description?: string | null,
      test?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
};

export type OnCreateTestSubscription = {
  onCreateTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
};

export type OnUpdateTestSubscription = {
  onUpdateTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTestSubscriptionVariables = {
  filter?: ModelSubscriptionTestFilterInput | null,
};

export type OnDeleteTestSubscription = {
  onDeleteTest?:  {
    __typename: "Test",
    id: string,
    name: string,
    description?: string | null,
    test?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
