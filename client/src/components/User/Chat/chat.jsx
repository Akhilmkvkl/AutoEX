import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Input, Button } from "antd";
import { ChatBubbleOutline, Send } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const socket = require("socket.io-client")("http://localhost:4000", {
  rejectUnauthorized: false // WARN: please do not do this in production
});
// const socket = io("");

const useStyles = makeStyles({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    height: "90%",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ccc",
  },
  chatHeaderText: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "red",
  },
  chatMessages: {
    width: "20%",
    height: "80%",
    overflowY: "auto",
    padding: "1rem",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  incomingMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "1rem",
    "& p": {
      marginLeft: "3rem",
    },
  },
  outgoingMessage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "1rem",
    "& p": {
      marginLeft: "1rem",
    },
  },
  messageInput: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    width: "100%",
    borderTop: "1px solid #ccc",
  },

  input: {
    marginRight: "1rem",
    width: "80%",
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
   
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
});

const Chat = () => {
  const userdetails = useSelector((state) => state.admin.userDetails);
  const token = useSelector((state) => state.admin.userToken);
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [session, setsession] = useState({});
  const sessiondetails = location.state;

  const sessionId = sessiondetails._id;
  const classes = useStyles();

  const [newMessage, setNewMessage] = useState("");

  async function getsession() {
    try {
      const res = await axiosUserInstance.post("/chatmessage", { sessionId },{headers: {
        'authorization': token,
        'Accept' : 'application/json', 
        'Content-Type': 'application/json'
    } });
      console.log(res.data);
      setsession(res.data.session);
      setMessages(res.data.session.messages);
    } catch (error) {}
  }


  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server"); 
      socket.on
      
    });
    getsession();
    
  }, [session]);


  async function handleSend(){
    if (newMessage !== "") {
      socket.emit("sendMessage",[{ sender: userdetails._id, message: newMessage },
      { sessionId }],)
      setNewMessage("");

      socket.on('sessions', data => {
         console.log(data,"this is from socket")
         setsession(data)
      });
    }


  };

 

  return (
    <div className="mt-32">
      <div className={classes.chatContainer}>
        <div className={classes.chatHeader}>
          <div className={classes.chatHeaderText}>Chat </div>
        </div>
        <div className={classes.chatMessages}>
          <List
            dataSource={messages}
            renderItem={(item) => (
              <div className={classes.messageContainer}>
                <div
                  className={
                    item.sender === userdetails._id
                      ? classes.outgoingMessage
                      : classes.incomingMessage
                  }
                >
                  <ChatBubbleOutline className={classes.messageIcon} />
                  <p>{item.message}</p>
                </div>
              </div>
            )}
          />
        </div>
        <div className={classes.messageInput}>
          <Input
            className={classes.input}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button className={classes.sendButton} onClick={()=>{handleSend()}}>
            Sent
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
