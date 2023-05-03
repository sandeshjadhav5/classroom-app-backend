const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: String,
  section: String,
  subject: String,
  notes: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      file: {
        type: String,
        required: true,
      },
      excelFile: String,
    },
  ],
  userID: String,
});

const TestModel = mongoose.model("test", testSchema);

module.exports = {
  TestModel,
};

// "name": "First Year",
// "section": "Graphics",
// "subject": "Computer Graphics",
// "room": 123654,
