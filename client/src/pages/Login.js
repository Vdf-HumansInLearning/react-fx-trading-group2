import React from "react";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";
import "../styles/style-auth.css";

const Login = () => {
  return (
    <div className="d-flex">
      <Aside />
      <main className="main">
        <div className="main__container">
          <h1 className="main__title">Log in to your account</h1>
          <hr className="solid" />
          <form method="POST" id="form">
            <div className="mb-3 d-flex align-content-center justify-content-evenly">
              <i className="fas fa-user-alt icon-auth"></i>
              <input
                id="inputEmail"
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="email@fxtrading.com"
                required
              />
            </div>
            <div className="mb-3 d-flex align-content-center">
              <i className="fas fa-unlock icon-auth"></i>
              <div className="mb-3 d-flex align-content-center flex-column"></div>
              <input
                id="inputPassword"
                type="password"
                name="password"
                className="form-control"
                placeholder="Password123!"
                required
              />
            </div>
            <BtnsLoginRegister textContent={"Login"} />
          </form>
        </div>
        <img
          className="mobile__image"
          src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
          alt="logo"
        ></img>
      </main>
    </div>
  );
};

export default Login;
