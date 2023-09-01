const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// connect to database

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database Connection Error", err)
});





// routes

app.use("/api/v1/", require("./routes/index"));

app.use("/", (req, res) => {
    res.send("Hello World")
})



app.use(globalErrorHandler);

module.exports = app;