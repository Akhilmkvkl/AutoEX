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
    },
    blocked:{
        required:true,
        type:Boolean
    }
})
  
const Brand= mongoose.model("Brands",BrandScema);

module.exports =Brand;