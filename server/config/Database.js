const mongoose=require('mongoose')

// const database=mongoose
// .connect("mongodb://localhost:27017/autoEX")
// .then(() => {
//   console.log("Database connected");
  
// })
// .catch(() => {
//   console.log("failed to connect database");
// });


const database=(req,res,next)=>{
    mongoose
    .connect(process.env.Database)
    .then(() => {
      console.log("Database connected");
      next()
    })
    .catch(() => {
      console.log("failed to connect database");
    }); 
}

module.exports=database;