import { useState } from "react";
import AuthenticationBg from "../../assets/img/authentication-bg.png";
import "../../assets/scss/authentication.scss";
import "./Register.scss";
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Register({ setShowRegisterForm }) {
  const [inputs, setInputs] = useState({});

  function validateInputs() {

  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    inputs.role = "client";
    const {confirm_password, ...others} = inputs;
    console.log(others);
    const response = await axios.post("", others);
    const data = response.data;
    console.log(data);
  };

  return (
    <div className="overlay">
      <div className="authentication register">
        <div className="authentication-left">
          <img src={AuthenticationBg} alt="Background image of registration" />
          <h2>Say Hello</h2>
          <hr />
          <h4>Make art, make a difference</h4>
          <p>
            Every sale on ArtMart will contribute to the charity fund to help
            homeless children, people with disabilities, and plant more trees
          </p>
          <span>by Elena Jullia</span>
        </div>
        <div className="authentication-right">
          <form className="form register-form" onSubmit={handleSubmit}>
            <img
              className="form-close-ic"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
              onClick={() => {
                setShowRegisterForm(false);
              }}
            />
            <h2 className="form-title">Sign Up</h2>
            <div className="form-field">
              <label htmlFor="username" className="form-field__label">
                Username
              </label>
              <input
                type="text"
                className="form-field__input"
                id="username"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            <div className="form-field">
              <label htmlFor="password" className="form-field__label">
                Password
              </label>
              <input
                type="text"
                className="form-field__input"
                id="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="form-field">
              <label
                htmlFor="confirm-password"
                className="form-field__label"
              >
                Confirm password
              </label>
              <input
                type="text"
                className="form-field__input"
                id="confirm-password"
                name="confirm_password"
                value={inputs.confirm_password || ""}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
            <div className="form-field">
              <label htmlFor="full-name" className="form-field__label">
                Full name
              </label>
              <input
                type="text"
                className="form-field__input"
                id="fullname"
                name="fullname"
                value={inputs.fullname || ""}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-field">
              <input
                type="submit"
                value="Register"
                className="form-field__input"
                id="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
          </form>
          <p className="form-extra-text">
            Already had an account?{" "}
            <span className="form-extra-text__link">Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
