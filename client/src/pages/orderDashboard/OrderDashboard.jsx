import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./OrderDashboard.scss";
import "../orderHistory/OrderHistory.scss";
import AddFeedback from "../../components/crudFeedback/addFeedback/AddFeedback.jsx";
import { UserContext } from "../../contexts/user.context.jsx";
// C:\Users\A\Circo\client\src\components\crudCommission\addCommission\AddCommission.jsx
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function OrderDashboard() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/user/order-dashboard/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  // Toggle display add feedback form
  const [showAddFeedbackForm, setShowAddFeedbackForm] = useState(false);
  const [selectedOrderToFeedback, setSelectedOrderToFeedback] = useState(false);

  return (
    <div className="order-history">
      <h3 className="profile-page__header">Order Dashboard ({orders?.length})</h3>
      <div className="order-history-container">
        {orders?.length > 0 ? (
          orders?.map((order) => {
            return (
              <div className="order-history-item">
                {/* <img
                  src={`../../public/uploads/${order.items[0].type}s/${order.items[0].itemId.images[0]}`}
                  alt=""
                  className="order-history-item__sample-img"
                /> */}
                <div className="order-history-item__info">
                  <h4 className="order-history-item__title">
                    {order?.items[0]?.title}
                  </h4>
                  <p className="order-history-item__price">
                    ${order.total?.toFixed(2) || order.items[0].itemId.price}
                  </p>
                  <p className="order-history-item__status">
                    {(order.status == "pending" &&
                      "Waiting for artist 's confirmation") ||
                      (order.status == "confirmed" &&
                        "Artist is working in progress") ||
                      (order.status == "in-delivery" &&
                        "The order is in delivery") ||
                      (order.status == "complete" &&
                        "The order has been delivered to customer")}
                  </p>
                  {order.status == "pending" && (
                    <>
                      <button className="order-history-item__btn btn btn-3">
                        Confirm
                      </button>
                      <button className="order-history-item__btn btn btn-1">
                        Cancel
                      </button>
                    </>
                  )}
                  <button className="order-history-item__btn btn btn-1">
                    View order details
                  </button>

                  <button
                    className="order-history-item__btn btn btn-1"
                    onClick={() => {
                      setShowAddFeedbackForm(true);
                      setSelectedOrderToFeedback(order._id);
                    }}
                  >
                    Deliver artwork
                  </button>
                  <button className="order-history-item__btn btn btn-1">
                    ...
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>You have no orders.</p>
        )}
      </div>

      {/* Modal forms */}
      {showAddFeedbackForm && (
        <AddFeedback
          setShowAddFeedbackForm={setShowAddFeedbackForm}
          selectedOrderToFeedback={selectedOrderToFeedback}
        />
      )}
    </div>
  );
}