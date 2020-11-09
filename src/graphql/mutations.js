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
