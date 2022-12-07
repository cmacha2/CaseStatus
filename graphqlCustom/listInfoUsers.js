export const listInfoUsers = /* GraphQL */ `
  query listInfoUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
        email
        notificationToken
      }
      nextToken
    }
  }
`;