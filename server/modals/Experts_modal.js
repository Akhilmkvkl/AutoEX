const mongoose = require("mongoose");
const schema = mongoose.Schema;


const expertsschema=new schema({

    ExpertId:{
        type:String,
        required:true
    } ,
    Expertname:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    Rate:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    profile:[

    ],
    Document:[

    ]

})

const Expert= mongoose.model('Experts',expertsschema)

module.exports=Expert