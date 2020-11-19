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
export const onCreateSplitEven = /* GraphQL */ `
  subscription OnCreateSplitEven($owner: String!) {
    onCreateSplitEven(owner: $owner) {
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
export const onUpdateSplitEven = /* GraphQL */ `
  subscription OnUpdateSplitEven($owner: String!) {
    onUpdateSplitEven(owner: $owner) {
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
export const onDeleteSplitEven = /* GraphQL */ `
  subscription OnDeleteSplitEven($owner: String!) {
    onDeleteSplitEven(owner: $owner) {
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
export const onCreateSplitItem = /* GraphQL */ `
  subscription OnCreateSplitItem($owner: String!) {
    onCreateSplitItem(owner: $owner) {
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
export const onUpdateSplitItem = /* GraphQL */ `
  subscription OnUpdateSplitItem($owner: String!) {
    onUpdateSplitItem(owner: $owner) {
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
export const onDeleteSplitItem = /* GraphQL */ `
  subscription OnDeleteSplitItem($owner: String!) {
    onDeleteSplitItem(owner: $owner) {
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
