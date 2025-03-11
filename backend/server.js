const express = require("express");

require("dotenv").config();

const port = process.env.PORT || 3001;

// connect to database
const connectDb = require("./app/config/db");
connectDb();

// create express app
const app = express();

const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
  })
);

app.use(express.json());

// define a simple route
app.get("/", (req, res) => {
  res.status(200).json({ [port]: port });
});

const chat_router = require("./app/routes/chat.routes");
const auth_router = require("./app/routes/auth.routes");
const user_router = require("./app/routes/user.routes");
const message_router = require("./app/routes/message.routes");

app.use("/auth", auth_router);

// auth middleware
const auth = require("./app/middleware/auth.middleware");
app.use(auth);

app.use("/chat", chat_router);
app.use("/user", user_router);
app.use("/message", message_router);

// error handling middleware
const { errorHandler, notFound } = require("./app/middleware/error.middleware");
app.use(notFound);
app.use(errorHandler);

// listen for requests
const server = app.listen(port, () => {
  console.log("Server is listening on port ", port);
});

const io = require("socket.io")(server, {
  pingTimeout: 30000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (user_data) => {
    socket.join(user_data._id);
    socket.emit("connected");
  });

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("joined room", room);
  });

  socket.on("new_message", (new_message) => {
    let chat = new_message.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // chat message should not be sent to the sender
      if (user === new_message?.sender?._id) return;
      socket.to(user).emit("message_received", new_message);
    });
  });
});
