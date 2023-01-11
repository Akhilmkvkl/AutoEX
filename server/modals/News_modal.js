const mongoose = require("mongoose");
const schema = mongoose.Schema;

const newsschema = new schema({
   
    title:{
        type:String,
        required:true
    },
    news:{
        type:String,
        required:true
    },
    images:[
        
    ],
    date:{
        type:String
    }

  
});

const News = mongoose.model("newses", newsschema);

module.exports = News;