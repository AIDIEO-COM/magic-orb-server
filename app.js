const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
// const { Configuration, OpenAIApi } = require('openai');


const app = express();

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// })
// organization: process.env.ORG_ID,

// const OpenAI = new OpenAIApi(config);

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

module.exports = {
    app
};