import React from "react";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";
import "../styles/style-auth.css";

const Register = () => {
  return (
    <div className="d-flex">
      <Aside />
      <div className="main">
        <div className="main__container">
          <h1 className="main__title">Register a new account</h1>
          <hr className="solid" />
          <form method="POST" id="form">
            <div className="mb-3 align-content-center">
              <p>Username</p>
              <input
                className="form-control"
                id="inputUsername"
                type="text"
                name="user"
                aria-describedby="emailHelp"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-3 align-content-center">
              <p>Email adress</p>
              <input
                className="form-control"
                id="inputEmail"
                type="email"
                name="email"
                required
                placeholder="email@fxtrading.com"
              />
            </div>
            <div className="mb-3 align-content-center">
              <p>Password</p>
              <input
                className="form-control"
                id="inputPassword"
                type="password"
                required
                name="password"
                placeholder="Password123!"
              />
            </div>
            <div className="mb-3 align-content-center">
              <p>Confirm Password</p>
              <input
                className="form-control"
                id="inputPasswordConfirm"
                type="password"
                required
                name="co-password"
                placeholder="Password123!"
              />
            </div>
            <BtnsLoginRegister textContent={"Register"} />
          </form>
        </div>
        <img
          className="mobile__image register__logo"
          src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
          alt="logo"
        ></img>
      </div>
    </div>
  );
};

export default Register;
