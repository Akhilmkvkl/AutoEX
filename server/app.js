let createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
let mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const database = require("./config/Database");
const Error = require("./middlewares/Error");
const { ObjectId } = require("mongodb");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const usersRouter = require("./routes/user/user");
const adminRouter = require("./routes/admin/Admin");
const Userctrl = require("./controllers/Userctrl");
const Session = require("./modals/Session_modal");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", usersRouter);
app.use("/admin", adminRouter);

const PORT = process.env.PORT || 4000;


app.use(Error);

// Socket io
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


// const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("sendMessage",async (data) => { 
     console.log(data)
     
     console.log(data[1]);
     const message = data[0];
     const sessionid = data[1];
     console.log(sessionid.sessionId);
      
     const session = await Session.findOne({
       _id: ObjectId(sessionid.sessionId),
     });

     session.messages.push(message);

     await session.save().then(async() => {
      const session = await Session.findOne({ _id: ObjectId(sessionid.sessionId) });
      if (session) {
        console.log(session);
        socket.emit('sessions', session);
      }

       console.log("success");
     });
    
   
  });

});


mongoose
  .connect("mongodb://localhost:27017/autoEX")
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("failed to connect database");
  });

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

module.exports = app;
