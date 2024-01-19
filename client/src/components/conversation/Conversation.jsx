import { useContext } from "react";
import "./Conversation.scss";
import { UserContext } from "../../contexts/user.context.jsx";

export default function Conversation({ conversation }) {
  if (!conversation) {
    return null;
  }
  const { user } = useContext(UserContext);

  

  return (
    <div className="conversation-details">
      <div className="conversation-details__header">
        <div className="user-info">
          <img
            src={conversation.otherMember?.avatar}
            alt=""
            className="user-info__avt avt-s"
          />
          <div className="user-info__name">
            <div className="user-info__name__fullname">
              {conversation.otherMember?.username}
            </div>
            <div className="user-info__name__username">
              {conversation.otherMember?.title
                ? conversation.otherMember?.title
                : "Freelance artist"}
            </div>
          </div>
        </div>
      </div>

      <div className="conversation-details__message-container">
        {conversation?.messages.map((message) => {
          return (
            <div
              className={`conversation-details__message-item ${
                message.senderId == user?._id ? "right" : "left"
              }`}
              key={message._id}
            >
              <p className="conversation-details__message-item__content">
                <span>{message.content}</span>
              </p>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}
