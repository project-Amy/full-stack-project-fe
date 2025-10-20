export const Endpoints = {
  GET_ALL_BOARD: "api/boards", // get
  CREATE_BOARD: "api/boards", // post
  GET_BOARD_BY_ID: "api/boards/:id", // get
  UPDATE_BOARD: "api/boards/:id", // patch
  DELETE_BOARD: "api/boards/:id", // delete
  GET_BOARD_TASKS: "api/boards/:boardId/tasks", // get - ritorna solo task della board
  INVITE_USER: "api/invitations", // post
  GET_USER_INVITATIONS: "api/invitations/user", // get
  GET_BOARD_INVITATIONS: "api/invitations/board/:boardId", // get
  RESPOND_TO_INVITATION: "api/invitations/:id/respond", // post
  GET_ALL_USERS: "api/users", // get
  CREATE_TASK: "api/tasks", // post
  UPDATE_TASK: "api/tasks/:id", // patch
  DELETE_TASK: "api/tasks/:id", // delete
} as const


export const EndpointsKey = {
  GET_ALL_BOARD: "GET_ALL_BOARD",
  GET_BOARD_BY_ID: "GET_BOARD_BY_ID",
  GET_BOARD_TASKS: "GET_BOARD_TASKS",
  GET_USER_INVITATIONS: "GET_USER_INVITATIONS",
  GET_BOARD_INVITATIONS: "GET_BOARD_INVITATIONS",
  GET_ALL_USERS: "GET_ALL_USERS"
}