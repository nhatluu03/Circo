import { useContext } from "react";
import "./Conversation.scss";
import { UserContext } from "../../contexts/user.context.jsx";

export default function Conversation({ conversation }) {
  if (!conversation) {
    return null;
  }
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      content: newMessage,
    };
    const receiverId = conversation?.otherMember.userId;
    console.log("1");
    console.log(receiverId);

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      content: newMessage,
    });

    try {
      const res = await axios.put(
        `http://localhost:3000/conversations/${currentChat}?userId=${user._id}`,
        message
      );
      setConversation(res.data);
      console.log("2");
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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

      <form className="new-message-form" onSubmit={handleSubmit}>
        <div className="new-message-form--left">
        <div className="form-field">
          <i class="fa-solid fa-plus open-media-ic"></i>
        </div>

        <div className="form-field">
          <input
            type="text"
            id="new-message"
            className="form-field__input"
            placeholder="Type a message"
          />
        </div>
    
        </div>
       
       <div className="new-message-form--right">
       <div className="form-field">
        <i class="fa-regular fa-face-smile open-icons-ic"></i>
        </div>
       <div className="form-field">
          <label htmlFor="new-message-submit-btn" className="form-field__label">
          <i class="fa-regular fa-paper-plane"></i>
            </label>
          <input
          type="submit"
          id="new-message-submit-btn"
          name="message"
          value="Send"
          className="form-field__input"
        />
        </div>

       </div>
       
      </form>
    </div>
  );
}
