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
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
