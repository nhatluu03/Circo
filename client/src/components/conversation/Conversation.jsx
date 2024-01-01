import React from "react";
import "./Conversation.scss";

export default function Conversation({ conversation }) {
  if (!conversation) {
    return null;
  }

  return (
    <div className="conversation">
      <div className="conversation-header">
        <div className="user-info">
          <img
            src={conversation.otherMember?.avatar}
            alt=""
            className="user-info__avt"
          />
          <div className="user-info__name">
            <div className="user-info__username">
              {conversation.otherMember?.username}
            </div>
            <div className="user-info__username">
              {conversation.otherMember?.title
                ? conversation.otherMember?.title
                : "Freelance artist"}
            </div>
          </div>
        </div>
      </div>

      <div className="conversation-message-container">
        {conversation?.messages.map((message) => {
          return (
            <div className="conversation-message-item" key={message._id}>
              <p className="conversation-message-item__content">
                {message.content}
              </p>
            </div>
          );
        })}
      </div>

      <form className="new-message-form">
        <input type="text" id="new-message" className="form-field" placeholder="Type a message"/>
        
        <label htmlFor="new-message-submit-btn" className="form-field__label"><i class="fa-regular fa-paper-plane-top"></i></label>
        <input type="submit" id="new-message-submit-btn" name="message" value="Send" className="form-field__input" />
      </form>
    </div>
  );
}
