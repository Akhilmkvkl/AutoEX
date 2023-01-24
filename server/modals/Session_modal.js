const mongoose = require("mongoose");
const schema = mongoose.Schema;

const sessionshema = new schema({
  bookedTime: { type: String, required: true },
  payment: { type: String },
  members: [],
  expertName:{type:String},
  user:{type:String},
  messages: [
    {
      sender: { type: String },
      message: { type: String },
      time: { type: String },
    },
  ],
});

const Session = mongoose.model("Sessions", sessionshema);

module.exports = Session;
