const TestModel = require("../models/Test.model");

const noteData = async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  try {
    const note = await TestModel.findById(id);
    if (note) {
      await note.updateOne({ $push: { notes: data } });
      let findAllNotes = await TestModel.findOne({ _id: id });
      res.send({ message: "Note Added", notes: findAllNotes });
    } else {
      res.send("Test Not Found");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  noteData,
};
