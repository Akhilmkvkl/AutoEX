const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vehicleschema = new schema({
  Name: {
    type: String,
    required: true,
  },
  Brand: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Engine: {
    type: String,
    required: true,
  },
  power: {
    type: String,
    required: true,
  },
  Torque: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  Fueltype: {
    type: String,
    required: true,
  },
  Seats: {
    type: String,
    required: true,
  },
  Mileage: {
    type: String,
    required: true,
  },
  Cylinders: {
    type: String,
    required: true,
  },
  Video: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Images: [],
});
 const vehicle=mongoose.model('vehicles',vehicleschema)

 module.exports=vehicle;
