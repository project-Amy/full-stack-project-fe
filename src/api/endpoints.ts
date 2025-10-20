export const Endpoints = {
  GET_ALL_BOARD: "api/boards", // get
  CREATE_BOARD: "api/boards", // post
  GET_BOARD_BY_ID: "api/boards/:id", // get
  INVITE_USER: "api/invitations", // post
  GET_USER_INVITATIONS: "api/invitations/user", // get
  GET_BOARD_INVITATIONS: "api/invitations/board/:boardId", // get
  RESPOND_TO_INVITATION: "api/invitations/:id/respond", // post
  GET_ALL_USERS: "api/users", // get
  CREATE_TASK: "api/tasks", // post
  UPDATE_TASK: "api/tasks/:id", // patch
} as const


export const EndpointsKey = {
  GET_ALL_BOARD: "GET_ALL_BOARD",
  GET_BOARD_BY_ID: "GET_BOARD_BY_ID",
  GET_USER_INVITATIONS: "GET_USER_INVITATIONS",
  GET_BOARD_INVITATIONS: "GET_BOARD_INVITATIONS",
  GET_ALL_USERS: "GET_ALL_USERS"
}