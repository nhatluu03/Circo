import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.scss";
import axios from "axios";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    const fetchOrderDetaisl = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderId}`,
          { withCredentials: true }
        );
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetaisl();
  }, []);

  return (
    <div className="order-details">
      <h3 className="profile-page__header">Order details</h3>
      <div
        className={`order-details__status-container ${
          orderDetails?.status == "pending" ? "pending" : ""
        } ${orderDetails?.status == "confirmed" ? "confirmed" : ""} ${
          orderDetails?.status == "in-delivery" ? "in-delivery" : ""
        } ${orderDetails?.status == "complete" ? "complete" : ""}`}
      >
        <div className="order-details__status-item">
          <i className="fa-solid fa-hourglass-start"></i>
          <h4 className="order-details__status-item__title">Pending</h4>
        </div>
        <span className="dashed-line active"></span>
        <div className="order-details__status-item">
          <i className="fa-regular fa-calendar-check"></i>
          <h4 className="order-details__status-item__title">Confirmed</h4>
        </div>
        <span className="dashed-line"></span>
        <div className="order-details__status-item">
          <i className="fa-solid fa-truck"></i>
          <h4 className="order-details__status-item__title">In-delivery</h4>
        </div>
        <span className="dashed-line"></span>
        <div className="order-details__status-item">
          <i class="fa-sharp fa-solid fa-clipboard-check"></i>
          <h4 className="order-details__status-item__title">Complete</h4>
        </div>
      </div>

      <div className="order-details__item-container">
        {orderDetails?.items.length > 0 &&
          orderDetails.items.map((item, index) => {
            return (
              <div className="order-details__item-item">
                {item.itemId?.images[0] && (
                  <img
                    // src={`../../public/uploads/${item.type}s/${item.itemId?.images[0]}`}
                    src={`../../public/uploads/${item.type}s/${item.itemId?.images[0]}`}
                    alt=""
                    className="order-history-item__sample-img"
                  />
                )}

                <div className="order-details__item-item__details">
                  <p>{`../../public/uploads/${item.type}s/${item.itemId?.images[0]}`}</p>
                  <p>{item?.itemId.images[0]}</p>
                  <h4 className="order-details__item-item__title">
                    {item.itemId?.title}
                  </h4>
                  <p>
                    Price:{" "}
                    <span className="order-details__item-item__price">
                      ${item.itemId?.price}
                    </span>
                  </p>
                  <p>
                    Quantity:{" "}
                    <span className="order-details__item-item__quantity">
                      x{item?.quantity}
                    </span>
                  </p>
                </div>

                {/* <img src="../../public/uploads/artworks/1704811560331Screenshot 2024-01-01 211725.png" alt="" /> */}
                {/* ../../public/uploads/artworks/1704811560331Screenshot 2024-01-01 211725.png
                ../../public/uploads/artworks/1704811560331Screenshot 2024-01-01 211725.png */}
                {/* <img src={`../../public/uploads/artworks/${item?.itemId.images[0]}`} alt=""  className="order-details__item-item__img"/> */}
                {/* C:\Users\A\Circo\client\public\uploads\artworks\1704811560331Screenshot 2024-01-01 211725.png */}
              </div>
            );
          })}
      </div>
    </div>
  );
}
