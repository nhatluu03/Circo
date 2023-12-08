import { useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import "./Messenger.scss";
import { io } from "socket.io-client";
import axios from 'axios';

export default function Messenger() {
  //Mock data including currentUser, currentChat, and newMessage
  const currentUser = {
    _id: "655c8afe9f5ae05cb5fc89fb",
    username: "LuuQuocNhat",
    role: "talent",
    avatar:
      "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png",
    country: "Vietnam",
    rating: 5,
  };
  const currentChat = {
    members: ["655c8afe9f5ae05cb5fc89fb", "6560ab19487316bb8ce89407"],
  };

  //Code
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  let [arrivalMessage, setArrivalMessage] = useState(null);
  const newMessage = "Hello, my name is Phap";
  //Socket Initialization
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    //Get message from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage = {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      };
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current?.on("getUsers", (users) => {
    });
  }, [currentUser]);
  //Fetch conversations of currentUser
  useEffect(()=>{
    const getConversation = async() =>{
      try {
        const res = await axios.get('http://localhost:3000/conversations/'+ currentUser._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversation();
  },[currentUser._id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );
    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });
    console.log(receiverId)
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <input placeholder="Search for artists" />
        {conversations.map(conversation=>(
        <Conversation key={conversation._id} conversation = {conversation} currentUser={currentUser} />
        ))}
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <Message />
            <Message own={true} />
            <Message />
            <Message own={true} />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
          <div className="chatBoxBottom">
            <textarea
              placeholder="Write something..."
            ></textarea>
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
}
