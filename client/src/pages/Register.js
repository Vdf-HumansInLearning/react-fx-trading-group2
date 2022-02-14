import React from "react";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";

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
              />
            </div>
            <div className="mb-3 align-content-center">
              <p>Email adress</p>
              <input
                className="form-control"
                id="inputEmail"
                type="email"
                name="email"
                placeholder="email@fxtrading.com"
              />
            </div>
            <div className="mb-3 align-content-center">
              <p>Password</p>
              <input
                className="form-control"
                id="inputPassword"
                type="password"
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
                name="co-password"
                placeholder="Password123!"
              />
            </div>
            <BtnsLoginRegister textContent={"Register"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
