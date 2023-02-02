const mongoose = require("mongoose");
const schema = mongoose.Schema;


const communityschema=new schema({
    
    name:{
        required:true,
        type:String
    },
    link:{
        required:true,
        type:String
    },
    platform:{
        required:true,
        type:String
    },
    decription:{
        required:true,
        type:String
    },
    blocked:{
        type:Boolean,
        
    }
})


const Community=mongoose.model('communities',communityschema)

module.exports=Community