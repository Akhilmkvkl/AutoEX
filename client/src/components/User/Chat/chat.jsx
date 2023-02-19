import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link, useLocation } from "react-router-dom";
import { axiosUserInstance } from "../../../instance/axios";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("/", {
  rejectUnauthorized: false, // WARN: please do not do this in production
});

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    padding: "1rem",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    overflowY: "auto",
    padding: "1rem",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  incomingMessage: {
    alignSelf: "flex-start",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "1rem",
    marginBottom: "0.5rem",
    "& p": {
      marginLeft: "1rem",
      marginRight: "3rem",
      whiteSpace: "pre-wrap",
    },
  },
  outgoingMessage: {
    alignSelf: "flex-end",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "1rem",
    marginBottom: "0.5rem",
    "& p": {
      marginLeft: "3rem",
      marginRight: "1rem",
      whiteSpace: "pre-wrap",
    },
  },
  messageIcon: {
    fontSize: "2rem",
    marginRight: "1rem",
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
    flexGrow: 1,
  },
  sendButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "1rem",
    minWidth: "6rem",
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  },
}));

const Chat = () => {
  const userdetails = useSelector((state) => state.admin.userDetails);
  const token = useSelector((state) => state.admin.userToken);
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [session, setsession] = useState({});
  const sessiondetails = location.state;

  const [mmessages, setmMessages] = useState([
    { id: 1, message: "Hi, how are you?", sender: "incoming" },
    { id: 2, message: "I am fine. What about you?", sender: "outgoing" },
    { id: 3, message: "I am good too.", sender: "incoming" },
  ]);

  const sessionId = sessiondetails._id;
  const classNameNameNamees = useStyles();

  const [newMessage, setNewMessage] = useState("");

  async function getsession() {
    try {
      const res = await axiosUserInstance.post(
        "/chatmessage",
        { sessionId },
        {
          headers: {
            authorization: token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setsession(res.data.session);
      setMessages(res.data.session.messages);
    } catch (error) {}
  }

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server");
    });
    getsession();
  }, [session]);

  async function handleSend() {
    if (newMessage !== "") {
      socket.emit("sendMessage", [
        { sender: userdetails._id, message: newMessage },
        { sessionId },
      ]);
      setNewMessage("");
    }
  }

  return (
    <div style={{ marginTop: 80 }}>
      <div
        className="flex h-screen antialiased text-gray-800"
        style={{ width: "100vw", height: "80vh", margin: 0 }}
      >
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full ">
            <div
              className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full "
              style={{ width: "100vw" }}
            >
              <div
                className="flex flex-col h-full overflow-x-auto mb-4"
                style={{ width: "100vw" }}
              >
                <div
                  className="flex flex-col h-full"
                  style={{ width: "100vw" }}
                >
                  <div
                    className="grid grid-cols-12 gap-y-2"
                    style={{ width: "100vw" }}
                  >
                    {messages.map((msg) => {
                      if (msg.sender === userdetails._id) {
                        return (
                          <div className="col-start-6 col-end-13 p-3 rounded-lg">
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                              </div>
                              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{msg.message}</div>
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                              </div>
                              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{msg.message}</div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4 "
        style={{ bottom: 0, position: "sticky" }}
      >
        <div>
          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="ml-4">
          <button
            onClick={() => {
              handleSend();
            }}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
