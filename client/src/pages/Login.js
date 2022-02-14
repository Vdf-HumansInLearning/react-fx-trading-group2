import React from "react";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";

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
                placeholder="Email"
                defaultValue="test@fxtrading.com"
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
                placeholder="Password"
                defaultValue="Test123!"
              />
            </div>
            <BtnsLoginRegister textContent={"Login"} />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
