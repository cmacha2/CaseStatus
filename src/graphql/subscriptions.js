/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      firstName
      lastName
      profilePicture
      email
      status
      notificationToken
      latitude
      longitude
      chatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      cases {
        items {
          id
          receiptNumber
          receiptDate
          titleCase
          description
          typeForm
          createdAt
          updatedAt
          userCasesId
        }
        nextToken
      }
      posts {
        items {
          id
          type
          content
          numberOfLikes
          likedBy
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      firstName
      lastName
      profilePicture
      email
      status
      notificationToken
      latitude
      longitude
      chatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      cases {
        items {
          id
          receiptNumber
          receiptDate
          titleCase
          description
          typeForm
          createdAt
          updatedAt
          userCasesId
        }
        nextToken
      }
      posts {
        items {
          id
          type
          content
          numberOfLikes
          likedBy
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      firstName
      lastName
      profilePicture
      email
      status
      notificationToken
      latitude
      longitude
      chatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      cases {
        items {
          id
          receiptNumber
          receiptDate
          titleCase
          description
          typeForm
          createdAt
          updatedAt
          userCasesId
        }
        nextToken
      }
      posts {
        items {
          id
          type
          content
          numberOfLikes
          likedBy
          createdAt
          updatedAt
          userPostsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      isSeenBy
      messages {
        items {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        nextToken
      }
      lastMessage {
        id
        chatRoomID
        author {
          id
          firstName
          lastName
          profilePicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        messageAuthorId
      }
      participants {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      isSeenBy
      messages {
        items {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        nextToken
      }
      lastMessage {
        id
        chatRoomID
        author {
          id
          firstName
          lastName
          profilePicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        messageAuthorId
      }
      participants {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      isSeenBy
      messages {
        items {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        nextToken
      }
      lastMessage {
        id
        chatRoomID
        author {
          id
          firstName
          lastName
          profilePicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        messageAuthorId
      }
      participants {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      numberOfLikes
      likedBy
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      numberOfLikes
      likedBy
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      numberOfLikes
      likedBy
      createdAt
      updatedAt
      userPostsId
    }
  }
`;
export const onCreateCase = /* GraphQL */ `
  subscription OnCreateCase($filter: ModelSubscriptionCaseFilterInput) {
    onCreateCase(filter: $filter) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiptNumber
      receiptDate
      titleCase
      description
      typeForm
      createdAt
      updatedAt
      userCasesId
    }
  }
`;
export const onUpdateCase = /* GraphQL */ `
  subscription OnUpdateCase($filter: ModelSubscriptionCaseFilterInput) {
    onUpdateCase(filter: $filter) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiptNumber
      receiptDate
      titleCase
      description
      typeForm
      createdAt
      updatedAt
      userCasesId
    }
  }
`;
export const onDeleteCase = /* GraphQL */ `
  subscription OnDeleteCase($filter: ModelSubscriptionCaseFilterInput) {
    onDeleteCase(filter: $filter) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      receiptNumber
      receiptDate
      titleCase
      description
      typeForm
      createdAt
      updatedAt
      userCasesId
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      chatRoomMessagesId
      messageAuthorId
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      chatRoomMessagesId
      messageAuthorId
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
      chatRoomMessagesId
      messageAuthorId
    }
  }
`;
export const onCreateUserChatRooms = /* GraphQL */ `
  subscription OnCreateUserChatRooms(
    $filter: ModelSubscriptionUserChatRoomsFilterInput
  ) {
    onCreateUserChatRooms(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        isSeenBy
        messages {
          nextToken
        }
        lastMessage {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        participants {
          nextToken
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserChatRooms = /* GraphQL */ `
  subscription OnUpdateUserChatRooms(
    $filter: ModelSubscriptionUserChatRoomsFilterInput
  ) {
    onUpdateUserChatRooms(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        isSeenBy
        messages {
          nextToken
        }
        lastMessage {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        participants {
          nextToken
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserChatRooms = /* GraphQL */ `
  subscription OnDeleteUserChatRooms(
    $filter: ModelSubscriptionUserChatRoomsFilterInput
  ) {
    onDeleteUserChatRooms(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        email
        status
        notificationToken
        latitude
        longitude
        chatRooms {
          nextToken
        }
        cases {
          nextToken
        }
        posts {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        isSeenBy
        messages {
          nextToken
        }
        lastMessage {
          id
          chatRoomID
          content
          createdAt
          updatedAt
          chatRoomMessagesId
          messageAuthorId
        }
        participants {
          nextToken
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
    }
  }
`;
