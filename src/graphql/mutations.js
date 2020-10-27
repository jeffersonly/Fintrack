/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSaving = /* GraphQL */ `
  mutation CreateSaving(
    $input: CreateSavingInput!
    $condition: ModelSavingConditionInput
  ) {
    createSaving(input: $input, condition: $condition) {
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
export const updateSaving = /* GraphQL */ `
  mutation UpdateSaving(
    $input: UpdateSavingInput!
    $condition: ModelSavingConditionInput
  ) {
    updateSaving(input: $input, condition: $condition) {
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
export const deleteSaving = /* GraphQL */ `
  mutation DeleteSaving(
    $input: DeleteSavingInput!
    $condition: ModelSavingConditionInput
  ) {
    deleteSaving(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createExpense = /* GraphQL */ `
  mutation CreateExpense(
    $input: CreateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    createExpense(input: $input, condition: $condition) {
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
export const updateExpense = /* GraphQL */ `
  mutation UpdateExpense(
    $input: UpdateExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    updateExpense(input: $input, condition: $condition) {
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
export const deleteExpense = /* GraphQL */ `
  mutation DeleteExpense(
    $input: DeleteExpenseInput!
    $condition: ModelExpenseConditionInput
  ) {
    deleteExpense(input: $input, condition: $condition) {
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
