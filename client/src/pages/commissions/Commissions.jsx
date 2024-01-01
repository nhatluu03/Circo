import { useState } from "react";
import "./Commissions.scss";

export default function Commissions() {
  return (
    <div className="commissions">
      <h3 className="profile-page__header">Commissions</h3>
      <div className="commission-container">
        <div className="commission-item">
          <div className="commission-item__sample-container">
            <img
              src="https://i.pinimg.com/736x/2f/5f/60/2f5f60ad8cf31a5efce8a434522cf30d.jpg"
              alt=""
              className="commission-item__sample-item large"
            />
            <div>
              <img
                src="https://i.pinimg.com/736x/83/b5/c7/83b5c76f1718d9b6a4b283c2673aa401.jpg"
                alt=""
                className="commission-item__sample-item"
              />
              <img
                src="https://i.pinimg.com/736x/86/e7/56/86e756be27a76e56066c8586d26e2d0f.jpg"
                alt=""
                className="commission-item__sample-item"
              />
            </div>
          </div>
          <div className="commission-item__details">
            <h4 className="commission-item__details__header">
              Realistic drawings
            </h4>
            <p className="commission-item__details__style">
              <strong>Materials: </strong>Lorem Ipsum is simply dummy
            </p>
            <p className="commission-item__details__materials">
              <strong>Materials: </strong>watercolor, pencil, digital
            </p>
            <p className="commission-item__details__pricing">
              <strong>Price: </strong>100.000 - 400.000 VND
            </p>
            <p className="commission-item__details__notes">
              *Note: The above price applied for one portrait per A4 frame. For
              more, a price of 50% applied for the total price.
            </p>
            <button className="commission-item__book-btn btn-3 btn lg">
              Book commission
            </button>
          </div>
          <i class="fa-solid fa-ellipsis commission-item__edit-ic"></i>
        </div>
        <div className="commission-item">
          <div className="commission-item__sample-container">
            <img
              src="https://i.pinimg.com/736x/2f/5f/60/2f5f60ad8cf31a5efce8a434522cf30d.jpg"
              alt=""
              className="commission-item__sample-item large"
            />
            <div>
              <img
                src="https://i.pinimg.com/736x/83/b5/c7/83b5c76f1718d9b6a4b283c2673aa401.jpg"
                alt=""
                className="commission-item__sample-item"
              />
              <img
                src="https://i.pinimg.com/736x/86/e7/56/86e756be27a76e56066c8586d26e2d0f.jpg"
                alt=""
                className="commission-item__sample-item"
              />
            </div>
          </div>
          <div className="commission-item__details">
            <h4 className="commission-item__details__header">
              Realistic drawings
            </h4>
            <p className="commission-item__details__style">
              <strong>Materials: </strong>Lorem Ipsum is simply dummy
            </p>
            <p className="commission-item__details__materials">
              <strong>Materials: </strong>watercolor, pencil, digital
            </p>
            <p className="commission-item__details__pricing">
              <strong>Price: </strong>100.000 - 400.000 VND
            </p>
            <p className="commission-item__details__notes">
              *Note: The above price applied for one portrait per A4 frame. For
              more, a price of 50% applied for the total price.
            </p>
            <button className="commission-item__book-btn btn-3 btn lg">
              Book commission
            </button>
          </div>
          <i class="fa-solid fa-ellipsis commission-item__edit-ic"></i>
        </div>
        <div className="commission-item">
          <div className="commission-item__sample-container">
            <img
              src="https://i.pinimg.com/736x/2f/5f/60/2f5f60ad8cf31a5efce8a434522cf30d.jpg"
              alt=""
              className="commission-item__sample-item large"
            />
            <div>
              <img
                src="https://i.pinimg.com/736x/83/b5/c7/83b5c76f1718d9b6a4b283c2673aa401.jpg"
                alt=""
                className="commission-item__sample-item"
              />
              <img
                src="https://i.pinimg.com/736x/86/e7/56/86e756be27a76e56066c8586d26e2d0f.jpg"
                alt=""
                className="commission-item__sample-item"
              />
            </div>
          </div>
          <div className="commission-item__details">
            <h4 className="commission-item__details__header">
              Realistic drawings
            </h4>
            <p className="commission-item__details__style">
              <strong>Materials: </strong>Lorem Ipsum is simply dummy
            </p>
            <p className="commission-item__details__materials">
              <strong>Materials: </strong>watercolor, pencil, digital
            </p>
            <p className="commission-item__details__pricing">
              <strong>Price: </strong>100.000 - 400.000 VND
            </p>
            <p className="commission-item__details__notes">
              *Note: The above price applied for one portrait per A4 frame. For
              more, a price of 50% applied for the total price.
            </p>
            <button className="commission-item__book-btn btn-3 btn lg">
              Book commission
            </button>
          </div>
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>
    </div>
  );
}
