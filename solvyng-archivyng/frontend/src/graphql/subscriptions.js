/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserCardDetails = /* GraphQL */ `
  subscription OnCreateUserCardDetails(
    $filter: ModelSubscriptionUserCardDetailsFilterInput
  ) {
    onCreateUserCardDetails(filter: $filter) {
      id
      card_name
      card_number
      expire_date
      cvc_number
      subscription_plan
      user_email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserCardDetails = /* GraphQL */ `
  subscription OnUpdateUserCardDetails(
    $filter: ModelSubscriptionUserCardDetailsFilterInput
  ) {
    onUpdateUserCardDetails(filter: $filter) {
      id
      card_name
      card_number
      expire_date
      cvc_number
      subscription_plan
      user_email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserCardDetails = /* GraphQL */ `
  subscription OnDeleteUserCardDetails(
    $filter: ModelSubscriptionUserCardDetailsFilterInput
  ) {
    onDeleteUserCardDetails(filter: $filter) {
      id
      card_name
      card_number
      expire_date
      cvc_number
      subscription_plan
      user_email
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
