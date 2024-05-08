/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserMails = /* GraphQL */ `
  subscription OnCreateUserMails(
    $filter: ModelSubscriptionUserMailsFilterInput
  ) {
    onCreateUserMails(filter: $filter) {
      id
      user_email
      mail_subject
      mail_message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserMails = /* GraphQL */ `
  subscription OnUpdateUserMails(
    $filter: ModelSubscriptionUserMailsFilterInput
  ) {
    onUpdateUserMails(filter: $filter) {
      id
      user_email
      mail_subject
      mail_message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserMails = /* GraphQL */ `
  subscription OnDeleteUserMails(
    $filter: ModelSubscriptionUserMailsFilterInput
  ) {
    onDeleteUserMails(filter: $filter) {
      id
      user_email
      mail_subject
      mail_message
      createdAt
      updatedAt
      __typename
    }
  }
`;
