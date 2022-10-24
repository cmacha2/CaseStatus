/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicture
      backgroundPicture
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
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicture
      backgroundPicture
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
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      profilePicture
      backgroundPicture
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
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
          backgroundPicture
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
          backgroundPicture
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
          backgroundPicture
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      post {
        id
        type
        author {
          id
          firstName
          lastName
          profilePicture
          backgroundPicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        content
        numberOfLikes
        likedBy
        createdAt
        updatedAt
        userPostsId
      }
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      post {
        id
        type
        author {
          id
          firstName
          lastName
          profilePicture
          backgroundPicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        content
        numberOfLikes
        likedBy
        createdAt
        updatedAt
        userPostsId
      }
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      post {
        id
        type
        author {
          id
          firstName
          lastName
          profilePicture
          backgroundPicture
          email
          status
          notificationToken
          latitude
          longitude
          createdAt
          updatedAt
        }
        comments {
          nextToken
        }
        content
        numberOfLikes
        likedBy
        createdAt
        updatedAt
        userPostsId
      }
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userCommentsId
      postCommentsId
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      type
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
        }
        nextToken
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
export const createCase = /* GraphQL */ `
  mutation CreateCase(
    $input: CreateCaseInput!
    $condition: ModelCaseConditionInput
  ) {
    createCase(input: $input, condition: $condition) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const updateCase = /* GraphQL */ `
  mutation UpdateCase(
    $input: UpdateCaseInput!
    $condition: ModelCaseConditionInput
  ) {
    updateCase(input: $input, condition: $condition) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const deleteCase = /* GraphQL */ `
  mutation DeleteCase(
    $input: DeleteCaseInput!
    $condition: ModelCaseConditionInput
  ) {
    deleteCase(input: $input, condition: $condition) {
      id
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      chatRoomID
      author {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      receiver
      sender {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      postID
      caseID
      chatRoomID
      isSeen
      createdAt
      updatedAt
      notificationSenderId
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      receiver
      sender {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      postID
      caseID
      chatRoomID
      isSeen
      createdAt
      updatedAt
      notificationSenderId
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      receiver
      sender {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      type
      postID
      caseID
      chatRoomID
      isSeen
      createdAt
      updatedAt
      notificationSenderId
    }
  }
`;
export const createUserChatRooms = /* GraphQL */ `
  mutation CreateUserChatRooms(
    $input: CreateUserChatRoomsInput!
    $condition: ModelUserChatRoomsConditionInput
  ) {
    createUserChatRooms(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const updateUserChatRooms = /* GraphQL */ `
  mutation UpdateUserChatRooms(
    $input: UpdateUserChatRoomsInput!
    $condition: ModelUserChatRoomsConditionInput
  ) {
    updateUserChatRooms(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
export const deleteUserChatRooms = /* GraphQL */ `
  mutation DeleteUserChatRooms(
    $input: DeleteUserChatRoomsInput!
    $condition: ModelUserChatRoomsConditionInput
  ) {
    deleteUserChatRooms(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        firstName
        lastName
        profilePicture
        backgroundPicture
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
        comments {
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
