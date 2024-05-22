/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserPlanSubscription = /* GraphQL */ `
  subscription OnCreateUserPlanSubscription(
    $filter: ModelSubscriptionUserPlanSubscriptionFilterInput
  ) {
    onCreateUserPlanSubscription(filter: $filter) {
      id
      current_plan
      user_email
      current_plan_price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserPlanSubscription = /* GraphQL */ `
  subscription OnUpdateUserPlanSubscription(
    $filter: ModelSubscriptionUserPlanSubscriptionFilterInput
  ) {
    onUpdateUserPlanSubscription(filter: $filter) {
      id
      current_plan
      user_email
      current_plan_price
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserPlanSubscription = /* GraphQL */ `
  subscription OnDeleteUserPlanSubscription(
    $filter: ModelSubscriptionUserPlanSubscriptionFilterInput
  ) {
    onDeleteUserPlanSubscription(filter: $filter) {
      id
      current_plan
      user_email
      current_plan_price
      createdAt
      updatedAt
      __typename
    }
  }
`;
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
