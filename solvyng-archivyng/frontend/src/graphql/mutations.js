/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserCardDetails = /* GraphQL */ `
  mutation CreateUserCardDetails(
    $input: CreateUserCardDetailsInput!
    $condition: ModelUserCardDetailsConditionInput
  ) {
    createUserCardDetails(input: $input, condition: $condition) {
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
export const updateUserCardDetails = /* GraphQL */ `
  mutation UpdateUserCardDetails(
    $input: UpdateUserCardDetailsInput!
    $condition: ModelUserCardDetailsConditionInput
  ) {
    updateUserCardDetails(input: $input, condition: $condition) {
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
export const deleteUserCardDetails = /* GraphQL */ `
  mutation DeleteUserCardDetails(
    $input: DeleteUserCardDetailsInput!
    $condition: ModelUserCardDetailsConditionInput
  ) {
    deleteUserCardDetails(input: $input, condition: $condition) {
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
export const createUserMails = /* GraphQL */ `
  mutation CreateUserMails(
    $input: CreateUserMailsInput!
    $condition: ModelUserMailsConditionInput
  ) {
    createUserMails(input: $input, condition: $condition) {
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
export const updateUserMails = /* GraphQL */ `
  mutation UpdateUserMails(
    $input: UpdateUserMailsInput!
    $condition: ModelUserMailsConditionInput
  ) {
    updateUserMails(input: $input, condition: $condition) {
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
export const deleteUserMails = /* GraphQL */ `
  mutation DeleteUserMails(
    $input: DeleteUserMailsInput!
    $condition: ModelUserMailsConditionInput
  ) {
    deleteUserMails(input: $input, condition: $condition) {
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
