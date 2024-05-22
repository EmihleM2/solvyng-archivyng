/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserPlanSubscription = /* GraphQL */ `
  query GetUserPlanSubscription($id: ID!) {
    getUserPlanSubscription(id: $id) {
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
export const listUserPlanSubscriptions = /* GraphQL */ `
  query ListUserPlanSubscriptions(
    $filter: ModelUserPlanSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPlanSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        current_plan
        user_email
        current_plan_price
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserCardDetails = /* GraphQL */ `
  query GetUserCardDetails($id: ID!) {
    getUserCardDetails(id: $id) {
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
export const listUserCardDetails = /* GraphQL */ `
  query ListUserCardDetails(
    $filter: ModelUserCardDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCardDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUserMails = /* GraphQL */ `
  query GetUserMails($id: ID!) {
    getUserMails(id: $id) {
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
export const listUserMails = /* GraphQL */ `
  query ListUserMails(
    $filter: ModelUserMailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_email
        mail_subject
        mail_message
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
