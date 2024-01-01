import React from "react";
import "./DeliveryInfo.scss";

const DeliveryInfo = () => {
  return (
    <form className="deliveryInfo">
      <div className="deliverHeader">Delivery Information</div>
      <div className="deliveryBody">
        <div className="deliveryBodyLeft">
          <div className="deliveryGroup">
            <label>Recipient's fullname</label>
            <input name="recipientName" />
          </div>
          <div className="deliveryGroup">
            <label>Country</label>
            <input name="recipientName" />
          </div>
          <div className="deliveryGroup">
            <label>City</label>
            <input name="recipientName" />
          </div>
        </div>
        <div className="deliveryGroup">
          <label>Recipient's fullname</label>
          <input name="recipientName" />
        </div>
        <div className="deliveryGroup">
          <label>Recipient's fullname</label>
          <input name="recipientName" />
        </div>
        <div className="deliveryGroup">
          <label>Recipient's fullname</label>
          <input name="recipientName" />
        </div>
      </div>
    </form>
  );
};

export default DeliveryInfo;
