import { useState, useEffect, useContext } from "react";
import "./Checkout.scss";
import Pay from "../pay/Pay.jsx";
import { UserContext } from "../../contexts/user.context.jsx";
import { useNavigate } from "react-router-dom";
import CartItems from "../../components/cartItems/CartItems.jsx";
import axios from "axios";

function Checkout() {
  const [subTotalPrice, setSubTotalPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [checkoutInputs, setCheckoutInputs] = useState({});
  const [selectedPackagingOption, setSelectedPackagingOption] = useState(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const handleCheckoutInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCheckoutInputs((values) => ({ ...values, [name]: value }));
    console.log(checkoutInputs);
  };

  const deliveryFee = 20;

  useEffect(() => {
    // Calculate total price based on the current cartItems
    let subTotalPrice = 0;
    for (const item of cartItems) {
      subTotalPrice += item.price * item.quantity; // Multiply by quantity
    }
    let totalPrice = subTotalPrice;
    if (selectedPackagingOption) {
      totalPrice += selectedPackagingOption.price;
    }

    setSubTotalPrice(subTotalPrice);
    setTotalPrice(totalPrice);
  }, [cartItems, selectedPackagingOption]);

  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  // Packaging options
  const options = [
    {
      _id: "1",
      title: "Prenium Packaging",
      price: 20,
    },
    {
      _id: "2",
      title: "Special Packaging",
      price: 17,
    },
    {
      _id: "3",
      title: "Standard Packaging",
      price: 10,
    },
    {
      _id: "4",
      title: "Normal Packaging",
      price: 5,
    },
  ];

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectPackagingOption = (option) => {
    setSelectedPackagingOption(option);
    console.log(selectedPackagingOption);
    setIsOpen(false);
  };

  const handleRadioChange = () => {
    setShowForm(!showForm);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    checkoutInputs.total = totalPrice;
    if (selectedPackagingOption) {
      checkoutInputs.packagingOption = selectedPackagingOption;
    }

    const items = cartItems.map(({ _id, quantity }) => ({
      itemId: _id,
      quantity,
    }));
    checkoutInputs.items = items;
    checkoutInputs.status = "pending";
    checkoutInputs.client = user._id;
    console.log(checkoutInputs);

    const response = await axios.post(
      "http://localhost:3000/orders",
      checkoutInputs,
      { withCredentials: true }
    );
    if (response.data) {
      alert("Successfully order the products. Thank you for shopping with us!");
      navigate("/orderHistory");
    }
    // navigate("/artworks");
  };

  return (
    <div className="order">
      <div className="container">
        <div className="left">
          <div className="deliveryInfo">
            <span className="header">Delivery Information</span>
            <form className="deliveryForm">
              <div className="deliveryFormLeft">
                <div className="deliveryFormGroup">
                  <span>Recipient's fullname</span>
                  <input
                    placeholder="Enter your username"
                    // value={checkoutInputs?.fullname ? checkoutInputs.fullname : user?.fullname}
                    name="recipientName"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
                <div className="deliveryFormGroup">
                  <span>Country</span>
                  <input
                    placeholder="Enter your country"
                    // value={user?.country}
                    name="country"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
                <div className="deliveryFormGroup">
                  <span>City</span>
                  <input
                    placeholder="Enter your city"
                    value={user?.city}
                    name="city"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
              </div>
              <div className="deliveryFormRight">
                <div className="deliveryFormGroup">
                  <span>Mobile Number</span>
                  <input
                    placeholder="Enter your phone number"
                    value={user?.phone}
                    name="mobileNumber"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
                <div className="deliveryFormGroup">
                  <span>Province</span>
                  <input
                    placeholder="Enter your province"
                    value={user?.province}
                    name="province"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
                <div className="deliveryFormGroup">
                  <span>Street No</span>
                  <input
                    placeholder="Enter your street number"
                    name="streetNo"
                    onChange={handleCheckoutInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="packagingInfo">
            <span className="header">Packaging (for premium artist only)</span>
            <div className="packageContainer">
              <div className="packageMethods">
                <span>Packaging methods</span>
                <div className="packageHeader" onClick={handleToggleDropdown}>
                  {selectedPackagingOption
                    ? `${selectedPackagingOption?.title} $(${selectedPackagingOption?.price})`
                    : "--Choose packaging method--"}
                </div>

                {isOpen && (
                  <div className="packageOptions">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleSelectPackagingOption(option)}
                      >
                        {option.title} $({option.price})
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="packageNotes">
                <span> Notes </span>
                <input
                  type="text"
                  placeholder="Additional notes for packaging"
                  name="packagingNote"
                  onChange={handleCheckoutInputChange}
                />
              </div>
            </div>
          </div>
          <div className="paymentMethod">
            <span>Banking method</span>
            <div className="paymentOption">
              <div className="options">
                <div className="methodForm">
                  <input type="radio" onChange={handleRadioChange} />
                  <span>Credit card</span>
                </div>
                <div className="methodForm">
                  <input type="radio" onChange={handleRadioChange} />
                  <span>Visa card</span>
                </div>
              </div>
              {showForm && (
                <div className="payForm">
                  <Pay />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="orderSummary">
            <span className="header">Order Summary</span>
            <div className="container">
              <div className="order-cart-container">
                <CartItems cartItems={cartItems} setCartItems={setCartItems} />
              </div>
              <div className="coupons">
                <div className="couponsLabel">
                  <p className="mainLabel">Coupons</p>
                  <p>--</p>
                </div>
                <div className="couponsRight"></div>
              </div>
              <div className="deliver">
                <div className="deliverTop">
                  <p>Deliver in 3 days</p>
                  <p className="deliverPrice">${deliveryFee}</p>
                </div>
                <div className="deliverDetail">
                  <p>VN-EXPRESS</p>
                  <p>
                    Deliver to {checkoutInputs.streetNo}, {checkoutInputs.city}{" "}
                    city, {checkoutInputs.province} province,{" "}
                    {checkoutInputs.country}
                  </p>
                </div>
              </div>
              <div className="subtotal">
                <div className="subtotalInfo">
                  <p className="subtotalLabel">Subtotal</p>
                  <p className="subtotalPrice">${subTotalPrice}</p>
                </div>
                <div className="packagingInfo">
                  <p className="packagingLabel">Packaging</p>
                  <p className="packagingMethod">
                    {selectedPackagingOption?.title || "--"}
                  </p>
                </div>
              </div>
              <div className="confirm">
                <div className="total">
                  <p className="totalLabel">Total(USD)</p>
                  <p className="totalPrice">{totalPrice}</p>
                </div>
                <button className="confirmButton" onClick={handleSubmitOrder}>
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

// export default function Checkout() {
//   const packagingOptions = ["Standard Packaging"];

//   return (
//     <div className="checkout">
//       <div className="checkout-section-container">
//         <div className="checkout-section-container--left">
//           <h4 className="checkout-section-item__title">Delivery Information</h4>
//           <div className="checkout-section-item__content">

//           </div>
//         </div>

//         <div className="checkout-section-container--right">
//           <div className="checkout-section-item"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
