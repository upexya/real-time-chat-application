const chat_routes = {
  GET_ALL_CHAT: "/",
  GET_SINGLE_CHAT: "/:chat_id",
};

const auth_routes = {
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};

module.exports = {
  chat_routes,
  auth_routes,
};
