const mongoose = require("mongoose");
const schema = mongoose.Schema;


const BrandScema= new schema({
    Brandname:{
        required:true,
        type:String
    },
    icon:{
        required:true,
        type:String
    }
})
  
const Brand= mongoose.model("Brands",BrandScema);

module.exports =Brand;