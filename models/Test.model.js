const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  name: String,
  section: String,
  subject: String,
  room: Number,
  notes: [
    {
      title: String,
      date: Date,
      image: {
        data: Buffer,
        contentType: String,
      },
    },
  ],
  userID: String,
});

const TestModel = mongoose.model("test", testSchema);

module.exports = {
  TestModel,
};
