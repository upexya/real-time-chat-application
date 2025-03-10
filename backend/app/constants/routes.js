const chat_routes = {
  CHAT: "/",
  RENAME_GROUP: "/rename-group",
  ADD_GROUP_MEMBER: "/add-group-member",
  REMOVE_GROUP_MEMBER: "/remove-group-member",
};

const auth_routes = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

const user_routes = {
  USER: "/",
};

const message_routes = {
  MESSAGE: "/",
  GET_MESSAGES: "/:chat_id",
};

module.exports = {
  chat_routes,
  auth_routes,
  user_routes,
  message_routes,
};
