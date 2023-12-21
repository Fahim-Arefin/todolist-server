const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

//connection with mongoose
// -------------------------------------------------------------------------------------------------------------------
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8wioxsd.mongodb.net/ToDoList?retryWrites=true&w=majority`
  ) //connected to farmStand database
  .then(() => {
    console.log("Mongo connnection successful: ");
  })
  .catch((e) => {
    console.log("Mongo connection failed !!");
    console.log(e);
  });

// -------------------------------------------------------------------------------------------------------------------

// middleware
app.use(cors());
app.use(express.json());

//server
// -------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
// -------------------------------------------------------------------------------------------------------------------

// routes
// -------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("this is homepage");
});
// -------------------------------------------------------------------------------------------------------------------
