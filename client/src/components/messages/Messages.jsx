import { useState, useEffect } from "react";
import "./Messages.scss";

export default function Messages() {
  return (
    <>
      <div className="message">
        <form className="search-message-form">
          <input type="text" placeholder="Search messages" />
        </form>
        <div className="message-container">
          <div className="message-item">
            <img src="https://via.placeholder.com/150" alt="Avatar of user" />
            <div className="message-item__details">
              <p className="message-item__author">Luu Quoc Nhat</p>
              <p className="message-item__text">Lorem ipsum is simply dummy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
