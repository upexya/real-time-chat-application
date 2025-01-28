const express = require("express");

require("dotenv").config();

const port = process.env.PORT || 3001;

const connectDb = require("./app/config/db");
connectDb();

// create express app
const app = express();
app.use(express.json());

// define a simple route
app.get("/", (req, res) => {
  res.status(200).json({ [port]: port });
});

const chat_router = require("./app/routes/chat.routes");
const auth_router = require("./app/routes/auth.routes");

app.use("/chat", chat_router);
app.use("/auth", auth_router);


// listen for requests
app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
