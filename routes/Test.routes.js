const express = require("express");
const { TestModel } = require("../models/Test.model");
const multer = require("multer");

const testsRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET Request: Get all tests
testsRouter.get("/alltests", async (req, res) => {
  try {
    const tests = await TestModel.find();
    res.status(200).send(tests);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// GET Request: Get a single test by ID
testsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const test = await TestModel.findOne({ _id: id });
    if (test) {
      res.status(200).send(test);
    } else {
      res.status(404).send({ msg: "Test not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// POST Request: Create a new test
testsRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newTest = new TestModel(payload);
    await newTest.save();
    res.status(201).send({ msg: "Test Created" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// PATCH Request: Update a test by ID
testsRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  try {
    await TestModel.findByIdAndUpdate(id, payload);
    res.send("Test Updated");
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

// PATCH Request: Add a note to a test by ID
testsRouter.patch("/:id/addnote", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  if (req.file) {
    const newFile = {
      name,
      description,
      file: req.file.buffer.toString("base64"),
    };

    try {
      const test = await TestModel.findById(id);
      if (test) {
        test.notes.push(newFile);
        await test.save();
        res.status(200).send({ msg: "Note added" });
      } else {
        res.status(404).send({ msg: "Test not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  } else {
    res.status(400).send({ msg: "Missing file" });
  }
});

// DELETE Request: Delete a test by ID
testsRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await TestModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Test Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = {
  testsRouter,
};
