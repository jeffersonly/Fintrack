/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGoal = /* GraphQL */ `
  mutation CreateGoal(
    $input: CreateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    createGoal(input: $input, condition: $condition) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const updateGoal = /* GraphQL */ `
  mutation UpdateGoal(
    $input: UpdateGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    updateGoal(input: $input, condition: $condition) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const deleteGoal = /* GraphQL */ `
  mutation DeleteGoal(
    $input: DeleteGoalInput!
    $condition: ModelGoalConditionInput
  ) {
    deleteGoal(input: $input, condition: $condition) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const createSplitEven = /* GraphQL */ `
  mutation CreateSplitEven(
    $input: CreateSplitEvenInput!
    $condition: ModelSplitEvenConditionInput
  ) {
    createSplitEven(input: $input, condition: $condition) {
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
export const updateSplitEven = /* GraphQL */ `
  mutation UpdateSplitEven(
    $input: UpdateSplitEvenInput!
    $condition: ModelSplitEvenConditionInput
  ) {
    updateSplitEven(input: $input, condition: $condition) {
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
export const deleteSplitEven = /* GraphQL */ `
  mutation DeleteSplitEven(
    $input: DeleteSplitEvenInput!
    $condition: ModelSplitEvenConditionInput
  ) {
    deleteSplitEven(input: $input, condition: $condition) {
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
export const createSplitItem = /* GraphQL */ `
  mutation CreateSplitItem(
    $input: CreateSplitItemInput!
    $condition: ModelSplitItemConditionInput
  ) {
    createSplitItem(input: $input, condition: $condition) {
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
export const updateSplitItem = /* GraphQL */ `
  mutation UpdateSplitItem(
    $input: UpdateSplitItemInput!
    $condition: ModelSplitItemConditionInput
  ) {
    updateSplitItem(input: $input, condition: $condition) {
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
export const deleteSplitItem = /* GraphQL */ `
  mutation DeleteSplitItem(
    $input: DeleteSplitItemInput!
    $condition: ModelSplitItemConditionInput
  ) {
    deleteSplitItem(input: $input, condition: $condition) {
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
      repeated
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
      repeated
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
      repeated
      createdOn
      updatedOn
    }
  }
`;
export const createSpending = /* GraphQL */ `
  mutation CreateSpending(
    $input: CreateSpendingInput!
    $condition: ModelSpendingConditionInput
  ) {
    createSpending(input: $input, condition: $condition) {
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
export const updateSpending = /* GraphQL */ `
  mutation UpdateSpending(
    $input: UpdateSpendingInput!
    $condition: ModelSpendingConditionInput
  ) {
    updateSpending(input: $input, condition: $condition) {
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
export const deleteSpending = /* GraphQL */ `
  mutation DeleteSpending(
    $input: DeleteSpendingInput!
    $condition: ModelSpendingConditionInput
  ) {
    deleteSpending(input: $input, condition: $condition) {
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
