/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGoal = /* GraphQL */ `
  query GetGoal($id: ID!) {
    getGoal(id: $id) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const listGoals = /* GraphQL */ `
  query ListGoals(
    $filter: ModelGoalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        savingsGoal
        spendingsGoal
        owner
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getSplitEven = /* GraphQL */ `
  query GetSplitEven($id: ID!) {
    getSplitEven(id: $id) {
      id
      month
      day
      year
      size
      total
      tax
      tip
      evenSplit
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listSplitEvens = /* GraphQL */ `
  query ListSplitEvens(
    $filter: ModelSplitEvenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSplitEvens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        month
        day
        year
        size
        total
        tax
        tip
        evenSplit
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const getSplitItem = /* GraphQL */ `
  query GetSplitItem($id: ID!) {
    getSplitItem(id: $id) {
      id
      month
      day
      year
      total
      tax
      tip
      names
      split
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listSplitItems = /* GraphQL */ `
  query ListSplitItems(
    $filter: ModelSplitItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSplitItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        month
        day
        year
        total
        tax
        tip
        names
        split
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
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
      repeated
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
        repeated
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
      payment
      repeated
      file {
        bucket
        region
        key
      }
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
        payment
        repeated
        file {
          bucket
          region
          key
        }
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
        repeated
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
        payment
        repeated
        file {
          bucket
          region
          key
        }
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
