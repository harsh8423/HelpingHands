import React, { useContext, useState, useEffect, useRef } from "react";
import ContextApi from "../ApiAndComponent/ContextApi";
import UserNavbar from "../ApiAndComponent/UserNavbar";
import { useLocation } from "react-router-dom";
import userIcon from "../images/user1.png";
import "../css/LoginCss.css";
import { io } from "socket.io-client";

import blueTickIcon from "../images/icons8-portfolio-48.png";
import doubleTickIcon from "../images/icons8-double-tick-50.png";

export default function ChatRoom() {
  const a = useContext(ContextApi);
  const location = useLocation();
  const id = location?.state;
  console.log("location id: ", id);

  const [socket, setsocket] = useState(null);
  const [conversations, setconversations] = useState([]);
  const [inputMessage, setinputMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [chatID, setchatID] = useState("");
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [recieverId, setrecieverId] = useState("");
  const [name, setname] = useState("");
  const [view, setview] = useState(false);
  const messageRef = useRef(null);
  const [notificationCount, setnotificationCount] = useState("");
  const [notification, setnotification] = useState("");
  console.log("OnlineUsers", OnlineUsers);
  console.log("messeges after online users", messages);

  useEffect(() => {
    setsocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", a.user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on("getMessage", (data) => {
      console.log("getMessage", data);
      setmessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on("getNotification", (data) => {
      setnotification(data.message);
      setnotificationCount("1");
    });
  }, [socket]);

  const markAsRead = async () => {
    console.log("maerkasread function entered");
    setnotificationCount("");
    setnotification("");
    setnotificationCount(0);
    const response = await fetch("http://localhost:5000/api/markAsRead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recieverId: recieverId,
        senderId: a.user._id,
        chatId: chatID,
      }),
    });
    const json = await response.json();
    const conversation = json.conversations;
    if (conversation) {
      console.log("marked as read convaaersation found");
      sortconversation(conversation);
    } else {
      console.log("marked as read convaaersation not found");
    }
  };

  const sortconversation = async (conversations) => {
    await conversations.sort((a, b) => {
      const dateA = new Date(a.notification[0].dateStamp);
      const dateB = new Date(b.notification[0].dateStamp);

      // Compare dates in reverse order to get the latest first
      return dateB - dateA;
    });

    setconversations(conversations);
  };

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({
      behavior: "smooth",
    });
    markAsRead();
  };

  useEffect(() => {
    if (messageRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const getmessages = async () => {
    const response = await fetch("http://localhost:5000/api/getmessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: id,
        id: a.user._id,
      }),
    });
    const json = await response.json();
    const conversation = json.conversations;
    const mes = conversation.find((convo) => convo.userID === id);

    sortconversation(conversation);
    if (mes) {
      var name = mes.name;
      handleConversation(mes, name);
      setview(true);
    }
    console.log("json", json);

    if (json.success) {
      //   setconnects(connect);
      console.log("conversations", conversations);
    }
    if (!json.success) {
      console.log("Something went wrong");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("object", recieverId);

    socket?.emit("sendMessage", {
      senderID: a.user._id,
      receiverID: recieverId,
      message: inputMessage,
    });

    socket?.emit("sendNotification", {
      receiverID: recieverId,
      senderID: a.user._id,
      message: inputMessage,
      notificationCount: notificationCount,
    });

    console.log(" .........................", chatID);

    const response = await fetch("http://localhost:5000/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatID: chatID,
        recieverID: recieverId,
        senderID: a.user._id,
        message: inputMessage,
      }),
    });
    const json = await response.json();
    const conversation = json.conversations;
    sortconversation(conversation);
    markAsRead();

    if (json.success) {
      console.log("msg sent");
    }

    if (!json.success) {
      console.log("msg not sent Something went wrong");
    }
  };

  useEffect(() => {
    getmessages();
  }, []);

  const handleConversation = async (conversation, name) => {
    await getmessages();
    const message = conversation.chatID.messages;
    const chtid = conversation.chatID._id;
    const recieverID = conversation.userID;

    console.log("message ", message);
    console.log("recieverid ", recieverID);
    console.log(" ChitID.........................", chtid);

    setname(name);
    setrecieverId(recieverID);
    setchatID(chtid);
    setmessages(message);

    setview(true);
  };

  const onChangeHander = (event) => {
    setinputMessage(event.target.value);
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mt-5">
        <h2>Chat Room</h2>
        <div className="row">
          <div className="col-4 mt-4">
            <div className="container-fluid">
              <div className="row">
                {conversations?.map((conversation) => {
                  if (conversation.notification[0]) {
                    const currentDate = new Date();
                    const messageDate = new Date(
                      conversation?.notification[0]?.dateStamp
                    );

                    if (
                      currentDate.toDateString() === messageDate.toDateString()
                    ) {
                      // Message sent today
                      var formattedDate = messageDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                    } else if (
                      currentDate.getDate() - messageDate.getDate() ===
                      1
                    ) {
                      // Message sent yesterday
                      var formattedDate = "Yesterday";
                    } else if (
                      currentDate.getDate() - messageDate.getDate() ===
                      2
                    ) {
                      // Message sent day before yesterday
                      var formattedDate = messageDate.toLocaleDateString([], {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      });
                    } else {
                      // Message sent on a specific date
                      var formattedDate = messageDate.toLocaleDateString([], {
                        month: "numeric",
                        day: "numeric",
                        year: "2-digit",
                      });
                    }
                  }
                  var online = OnlineUsers.find(
                    (user) => user.userID === conversation?.userID
                  );
                  var name = conversation?.name;
                  var nCount = conversation.notificationCount;
                  var seen = conversation?.notification[0]?.seen;
                  return (
                    <div
                      className="col-12 normal-box p-3"
                      onClick={() => handleConversation(conversation, name)}
                      style={{
                        backgroundColor:
                          chatID === conversation.chatID ? "lightgreen" : "",
                        borderRadius: "0px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={userIcon}
                              width={50}
                              height={40}
                              alt="..."
                            />
                          </div>
                          <div className="col-10">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-12">
                                  {online && (
                                    <span
                                      style={{
                                        backgroundColor: "green",
                                        border: "6px solid green",
                                        float: "right",
                                        borderRadius: "50%",
                                      }}
                                    ></span>
                                  )}

                                  {conversation?.name}
                                  <span
                                    style={{
                                      color:
                                        nCount === 0 || seen ? "grey" : "green",
                                      padding: "0px 5px",
                                      float: "right",
                                    }}
                                  >
                                    <small style={{ fontWeight: "bold" }}>
                                      {formattedDate}
                                    </small>
                                  </span>
                                </div>
                                <div className="col-12">
                                  <div>
                                    <span
                                      style={{
                                        color:
                                          nCount === 0 || seen
                                            ? "grey"
                                            : "green",
                                        padding: "0px 5px",
                                      }}
                                    >
                                      {notification
                                        ? notification
                                        : conversation?.notification[0]
                                            ?.message}
                                    </span>
                                    <span
                                      style={{
                                        backgroundColor: "green",
                                        padding: "0px 15px",
                                        border: "1px solid green",
                                        color: "white",
                                        float: "right",
                                        fontWeight: "bold",
                                        borderRadius: "90%",
                                      }}
                                    >
                                      {notificationCount
                                        ? notificationCount
                                        : nCount === 0
                                        ? ""
                                        : nCount}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className="col-8 p-3 mt-3 normal-box"
            style={{ borderRadius: "0px", height: "70vh" }}
          >
            {view ? (
              <>
                <h3
                  style={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: "green",
                  }}
                >
                  {name} <hr style={{ borderWidth: "3px" }} />
                </h3>
                <div style={{ height: "47vh", overflow: "auto" }}>
                  {messages &&
                    messages.map((message, index) => {
                      if (message.senderID === a.user._id) {
                        var Mystyle = {
                          float: "right",
                          padding: "5px 10px",
                          backgroundColor: "rgba(130, 230, 113, 0.844)",
                          fontWeight: "bold",
                        };
                      } else {
                        var Mystyle = { float: "left", padding: "5px 10px" };
                      }

                      if (message?.dateStamp) {
                        const currentDate = new Date();
                        const messageDate = new Date(message?.dateStamp);

                        if (
                          currentDate.toDateString() ===
                          messageDate.toDateString()
                        ) {
                          // Message sent today
                          var formattedDate = messageDate.toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          );
                        } else if (
                          currentDate.getDate() - messageDate.getDate() ===
                          1
                        ) {
                          // Message sent yesterday
                          var formattedDate = "Yesterday";
                        } else if (
                          currentDate.getDate() - messageDate.getDate() ===
                          2
                        ) {
                          // Message sent day before yesterday
                          var formattedDate = messageDate.toLocaleDateString(
                            [],
                            {
                              month: "numeric",
                              day: "numeric",
                              year: "2-digit",
                            }
                          );
                        } else {
                          // Message sent on a specific date
                          var formattedDate = messageDate.toLocaleDateString(
                            [],
                            {
                              month: "numeric",
                              day: "numeric",
                              year: "2-digit",
                            }
                          );
                        }
                      }
                      return (
                        <>
                          <div
                            className="m-3"
                            ref={
                              messages.length - 1 === index ? messageRef : null
                            }
                          >
                            <div className="button-6" style={Mystyle}>
                              {message.message} <br />
                              <span
                                style={{
                                  color: "grey",
                                  padding: "0px 5px",
                                  float: "right",
                                }}
                              >
                                <small style={{ fontWeight: "bold" }}>
                                  {formattedDate}
                                </small>
                              </span>
                            </div>
                          </div>
                          <br />
                        </>
                      );
                    })}
                </div>
                <div style={{ float: "bottom" }}>
                  <form className="p-4" onSubmit={sendMessage}>
                    <label htmlFor="password"></label>
                    <input
                      className="text-center m-1 button-6"
                      style={{ width: "40vw" }}
                      type="text"
                      name="password"
                      placeholder="Write a message..."
                      value={inputMessage}
                      onChange={onChangeHander}
                      required
                    />
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      className="button-6"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center mt-5">
                  <h1 style={{ color: "green" }}>Helping Hands</h1>
                  <h3>Chat Room</h3>
                  <br />
                  <br />
                  <p className="p-5">
                    "Introducing a seamless messaging application that connects
                    you with your teammates instantly. Enjoy the convenience of
                    sending and receiving messages on any device, keeping your
                    communication efficient and effective. With user-friendly
                    interfaces our messaging app enhances your communication
                    experience, making staying connected effortless."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
