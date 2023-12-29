import React, { useEffect } from "react";
import './Conversation.scss'

export const Conversation = ({ conversation }) => {
  useEffect(() => {
    conversation = conversation
    console.log('1')
  }, [conversation]);
  console.log(conversation)
  return (
    <div className="conversation">
          <img src={conversation?.otherMember?.avatar} />
          {conversation?.messages.map((message) => {
            return (
              <div key={message._id}>
                <p>{message.content}</p>
              </div>
            );
          })}
    </div>
  );
};
