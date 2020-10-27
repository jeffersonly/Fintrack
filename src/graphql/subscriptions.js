/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdOn
      updatedOn
    }
  }
`;
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction($owner: String!) {
    onCreateTransaction(owner: $owner) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction($owner: String!) {
    onUpdateTransaction(owner: $owner) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction($owner: String!) {
    onDeleteTransaction(owner: $owner) {
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
export const onCreateExpense = /* GraphQL */ `
  subscription OnCreateExpense($owner: String!) {
    onCreateExpense(owner: $owner) {
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
export const onUpdateExpense = /* GraphQL */ `
  subscription OnUpdateExpense($owner: String!) {
    onUpdateExpense(owner: $owner) {
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
export const onDeleteExpense = /* GraphQL */ `
  subscription OnDeleteExpense($owner: String!) {
    onDeleteExpense(owner: $owner) {
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
