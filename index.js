const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const Ongoing = require("./models/ongoing");
const Completed = require("./models/completed");
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

// create a task
app.post("/tasks", async (req, res) => {
  try {
    const body = req.body;
    const task = new Task(body);
    const data = await task.save();
    res.status(201).send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// --------------------------------------------------------------

// get all task of a certain iser
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.find({ userId: id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get all task of a certain iser
app.get("/ongoing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Ongoing.find({ userId: id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// get all task of a certain iser
app.get("/completed/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Completed.find({ userId: id });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// --------------------------------------------------------------

// --------------------------------------------------------------

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Task.findByIdAndDelete(id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.delete("/ongoing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Ongoing.findByIdAndDelete(id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.delete("/completed/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Completed.findByIdAndDelete(id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// --------------------------------------------------------------

app.put("/tasks", async (req, res) => {
  try {
    const { reOrderedStore } = req.body;
    console.log(reOrderedStore);
    await Task.deleteMany({});
    await Task.insertMany(reOrderedStore);
    res.send("reordered succeessfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.put("/ongoing", async (req, res) => {
  try {
    const { reOrderedStore } = req.body;
    console.log(reOrderedStore);
    await Ongoing.deleteMany({});
    await Ongoing.insertMany(reOrderedStore);
    res.send("reordered succeessfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.put("/completed", async (req, res) => {
  try {
    const { reOrderedStore } = req.body;
    console.log(reOrderedStore);
    await Completed.deleteMany({});
    await Completed.insertMany(reOrderedStore);
    res.send("reordered succeessfully");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// -------------------------------------------------------------------------------------------------------------------
