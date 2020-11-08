/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGoal = /* GraphQL */ `
  subscription OnCreateGoal($owner: String!) {
    onCreateGoal(owner: $owner) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const onUpdateGoal = /* GraphQL */ `
  subscription OnUpdateGoal($owner: String!) {
    onUpdateGoal(owner: $owner) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const onDeleteGoal = /* GraphQL */ `
  subscription OnDeleteGoal($owner: String!) {
    onDeleteGoal(owner: $owner) {
      id
      savingsGoal
      spendingsGoal
      owner
      createdOn
      updatedOn
    }
  }
`;
export const onCreateSaving = /* GraphQL */ `
  subscription OnCreateSaving($owner: String!) {
    onCreateSaving(owner: $owner) {
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
export const onUpdateSaving = /* GraphQL */ `
  subscription OnUpdateSaving($owner: String!) {
    onUpdateSaving(owner: $owner) {
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
export const onDeleteSaving = /* GraphQL */ `
  subscription OnDeleteSaving($owner: String!) {
    onDeleteSaving(owner: $owner) {
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
export const onCreateSpending = /* GraphQL */ `
  subscription OnCreateSpending($owner: String!) {
    onCreateSpending(owner: $owner) {
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
export const onUpdateSpending = /* GraphQL */ `
  subscription OnUpdateSpending($owner: String!) {
    onUpdateSpending(owner: $owner) {
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
export const onDeleteSpending = /* GraphQL */ `
  subscription OnDeleteSpending($owner: String!) {
    onDeleteSpending(owner: $owner) {
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
