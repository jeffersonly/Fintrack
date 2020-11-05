/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSaving = /* GraphQL */ `
  query GetSaving($id: ID!) {
    getSaving(id: $id) {
      id
      month
      day
      year
      name
      value
      repeat
      note
      owner
      createdOn
      updatedOn
    }
  }
`;
export const listSavings = /* GraphQL */ `
  query ListSavings(
    $filter: ModelSavingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        month
        day
        year
        name
        value
        repeat
        note
        owner
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getSpending = /* GraphQL */ `
  query GetSpending($id: ID!) {
    getSpending(id: $id) {
      id
      month
      day
      year
      name
      value
      category
      repeat
      note
      owner
      createdOn
      updatedOn
    }
  }
`;
export const listSpendings = /* GraphQL */ `
  query ListSpendings(
    $filter: ModelSpendingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpendings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        month
        day
        year
        name
        value
        category
        repeat
        note
        owner
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const savingsByOwner = /* GraphQL */ `
  query SavingsByOwner(
    $owner: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSavingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    savingsByOwner(
      owner: $owner
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        month
        day
        year
        name
        value
        repeat
        note
        owner
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const spendingsByOwner = /* GraphQL */ `
  query SpendingsByOwner(
    $owner: String
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSpendingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    spendingsByOwner(
      owner: $owner
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        month
        day
        year
        name
        value
        category
        repeat
        note
        owner
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
