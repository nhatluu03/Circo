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
              Scenery paintings
            </h4>
            <p className="commission-item__details__style">
              <strong>Styles: </strong>Sketch, Realistic
            </p>
            <p className="commission-item__details__materials">
              <strong>Materials: </strong>Watercolor, oil
            </p>
            <p className="commission-item__details__pricing">
              <strong>Price: </strong>40$ - 99$
            </p>
            <p className="commission-item__details__notes">
              *Note: The above price applied for one object per A5 frame. For
              more, a price of 20% applied for the total price.
            </p>
            <button className="commission-item__book-btn btn-3 btn lg">
              Book commission
            </button>
            <i class="fa-solid fa-ellipsis commission-item__edit-ic"></i>
          </div>
        </div>
        <div className="commission-item">
          <div className="commission-item__sample-container">
            <img
              src="https://i.pinimg.com/564x/dd/cc/28/ddcc28637a3598e1fd3625c70af72213.jpg"
              alt=""
              className="commission-item__sample-item large"
            />
            <div>
              <img
                src="https://i.pinimg.com/736x/01/85/3f/01853fb047209c0ab87744af4cbb63fc.jpg"
                alt=""
                className="commission-item__sample-item"
              />
              <img
                src="https://i.pinimg.com/564x/b6/7b/b7/b67bb7639a218fd36362f3301fce846d.jpg"
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
            <i class="fa-solid fa-ellipsis commission-item__edit-ic"></i>
          </div>
        </div>
        <div className="commission-item">
          <div className="commission-item__sample-container">
            <img
              src="https://i.pinimg.com/564x/4f/ff/55/4fff55d1f335f8c74ec5f56d4d16933f.jpg"
              alt=""
              className="commission-item__sample-item large"
            />
            <div>
              <img
                src="https://i.pinimg.com/564x/51/d1/dd/51d1ddc3a060f0d9f4ba54f03909df99.jpg"
                alt=""
                className="commission-item__sample-item"
              />
              <img
                src="https://i.pinimg.com/564x/14/80/8f/14808f0a5906689f7b686106ae667685.jpg"
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
            <i class="fa-solid fa-ellipsis commission-item__edit-ic"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
