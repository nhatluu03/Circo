import axios from "axios";
import React, { useEffect, useState } from "react";
import "./coupons.scss";
const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get("http://localhost:3000/coupons");
      console.log(response.data);
      setCoupons(response.data);
    };

    fetchCoupons();
  }, []);

  const handleCouponModal = () => {
    setCreateMode(true);
  };
  return (
    <div className="coupons">
      <div className="coupons__creating">
        {createMode ? (
          <div className="couponCreate__container">
            <span className="couponCreate__form__header">
              Coupon Information
            </span>
            <div className="couponCreate__form">
              <div className="couponCreate__form__mainInfo">
                <div className="couponCreate__form__left">
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Title
                    </label>
                    <input type="text" placeholder="Enter the title" />
                  </div>
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Code
                    </label>
                    <input type="text" placeholder="Enter the code" />
                  </div>
                </div>

                <div className="couponCreate__form__right">
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Value
                    </label>
                    <input type="number" placeholder="Enter the value" />
                  </div>
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Count
                    </label>
                    <input type="number" placeholder="Enter the count" />
                  </div>
                </div>
              </div>
              <div className="couponCreate__form__Type">
                <label className="couponCreate__form__group__title">Type</label>
                <input />
              </div>
              <button
                className="couponCreate__form__button"
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCouponModal}
            className="coupons__creating__button"
          >
            Create a coupon
          </button>
        )}
      </div>
      <div className="coupons__container">
        {coupons.map((coupon, index) => (
          <div>
            <span>{coupon.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
