/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
  subscription OnUpdateUser {
    onUpdateUser {
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
  subscription OnDeleteUser {
    onDeleteUser {
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
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
  subscription OnCreatePost {
    onCreatePost {
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
  subscription OnUpdatePost {
    onUpdatePost {
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
  subscription OnDeletePost {
    onDeletePost {
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
  subscription OnCreateCase {
    onCreateCase {
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
  subscription OnUpdateCase {
    onUpdateCase {
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
  subscription OnDeleteCase {
    onDeleteCase {
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
  subscription OnCreateMessage {
    onCreateMessage {
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
  subscription OnUpdateMessage {
    onUpdateMessage {
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
  subscription OnDeleteMessage {
    onDeleteMessage {
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
  subscription OnCreateUserChatRooms {
    onCreateUserChatRooms {
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
  subscription OnUpdateUserChatRooms {
    onUpdateUserChatRooms {
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
  subscription OnDeleteUserChatRooms {
    onDeleteUserChatRooms {
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
