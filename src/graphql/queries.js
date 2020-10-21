/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSaving = /* GraphQL */ `
  query GetSaving($id: ID!) {
    getSaving(id: $id) {
      id
      date
      name
      value
      repeat
      note
      createdOn
      updatedOn
      owner
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
        date
        name
        value
        repeat
        note
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      date
      name
      value
      category
      note
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        name
        value
        category
        note
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const getExpense = /* GraphQL */ `
  query GetExpense($id: ID!) {
    getExpense(id: $id) {
      id
      date
      name
      value
      repeat
      note
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listExpenses = /* GraphQL */ `
  query ListExpenses(
    $filter: ModelExpenseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExpenses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        name
        value
        repeat
        note
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
