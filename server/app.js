const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const globalErrorHandler = require('./middlewares/globalErrorHandler');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"));

// connect to database
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log("Database Connection Error", err)
});

// routes

app.use("/api/v1/", require("./routes/index"));

// files route
app.use('/public', express.static('public'))

app.use("/", (req, res) => {
    res.send("Hello World")
})



app.use(globalErrorHandler);

module.exports = app