const express = require('express');

require('dotenv').config();

const port = process.env.PORT || 3001;

const connectDb = require('./app/config/db');
connectDb();

// create express app
const app = express();

// define a simple route
app.get('/', (req, res) => {
    res.json({[port] : port});
});

require('./app/routes/chat.routes')(app);
 
// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port ",port);
});
