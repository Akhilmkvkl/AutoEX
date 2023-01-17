const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userschema = new schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  isExpert:{
    type:String
  }
});

const Users = mongoose.model("users", userschema);

module.exports = Users;
