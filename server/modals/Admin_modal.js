const mongoose = require("mongoose");
const schema = mongoose.Schema;

const adminschema = new schema({

  email: {
    type: String,
   
  },
  password:{
    type:String,
    
  }
});

const Admin = mongoose.model("Admins", adminschema);

module.exports = Admin;