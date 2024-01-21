import axios from "axios";
import React, { useEffect, useState } from "react";
import "./coupons.scss";
const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [value, setValue] = useState('')
  const [code, setCode] = useState('')
  const [count, setCount] = useState('')
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
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const couponData = {
      title,
      type,
      value,
      code,
      count
    }
    const response = await axios.post('http://localhost:3000/coupons', couponData, {
      withCredentials: true
    })
    console.log(response.data)
  }
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
                    <input onChange={(e) =>setTitle(e.target.value)} type="text" placeholder="Enter the title" />
                  </div>
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Code
                    </label>
                    <input onChange={(e) =>setCode(e.target.value)} type="text" placeholder="Enter the code" />
                  </div>
                </div>

                <div className="couponCreate__form__right">
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Value
                    </label>
                    <input onChange={(e) =>setValue(e.target.value)} type="number" placeholder="Enter the value" />
                  </div>
                  <div className="couponCreate__form__group">
                    <label className="couponCreate__form__group__title">
                      Count
                    </label>
                    <input onChange={(e) =>setCount(e.target.value)} type="number" placeholder="Enter the count" />
                  </div>
                </div>
              </div>
              <div className="couponCreate__form__Type">
                <label className="couponCreate__form__group__title">Type</label>
                <select className="couponCreate__form__group__select">
                  <option value='amount' onChange={(e) => setType(e.target.value)}>Amount</option>
                  <option value='percentage' onChange={(e) => setType(e.target.value)}>Percentage</option>
                </select>
              </div>
              <button onClick={handleSubmit} className="couponCreate__form__button">
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
    </div>
  );
};

export default Coupons;
