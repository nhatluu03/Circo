import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import axios from "axios";
export default function Conversation({ conversation }, { currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser?._id
    );

    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/users?userId=" + friendId
        );
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    getUser()
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img alt="avatar" src={user?.avatar} />
      <span>{user?.username}</span>
    </div>
  );
}
