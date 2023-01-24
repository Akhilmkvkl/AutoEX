const mongoose = require("mongoose");
const schema = mongoose.Schema;



const reviewschema=new schema({

    rating:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    vehiclename:{
        type:String,
        required:true
    },
    vehicleid:{
        type:String,
        required:true
    },
    postedby:{
        type:String,
        required:true
    }
})
const Reviews=mongoose.model('reviews',reviewschema)

module.exports=Reviews;