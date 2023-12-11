import React from "react";
import "./ChatOnline.scss";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
    <div className="heading">Contact</div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            src="https://i.pinimg.com/736x/cb/fe/c8/cbfec855ed8d21551beb5d148e8eaf9d.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
}
