let createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
let mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser')
const database=require('./config/Database')
const Error=require('./middlewares/Error')

const usersRouter = require('./routes/user/user');
const adminRouter = require('./routes/admin/Admin')


app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/users',usersRouter );
app.use('/admin',adminRouter)

// app.use(database)

app.use(Error)

  







// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


mongoose
  .connect("mongodb://localhost:27017/autoEX")
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("failed to connect database");
  });



 
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
      console.log('Server is running on port', PORT)
  })


module.exports = app;
