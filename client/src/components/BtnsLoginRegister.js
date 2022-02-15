import React from "react";
import { Link } from "react-router-dom";

const BtnsLoginRegister = ({ textContent, handleLogin, handleRegister }) => {
  return (
    <>
      <button
        id={textContent === "Login" ? "loginBtn" : "submitBtn"}
        type="submit"
        className="main__btn"
        onClick={
          textContent === "Login"
            ? handleLogin
            : textContent === "Register"
            ? handleRegister
            : null
        }
      >
        {textContent}
      </button>

      <div className="register">
        {textContent === "Login" ? (
          <p>
            You don't have an account?
            <Link to="/register" className="link-primary">
              Register
            </Link>
          </p>
        ) : (
          textContent === "Register" && (
            <p>
              Already have an account?
              <Link to="/login" className="link-primary">
                Login
              </Link>
            </p>
          )
        )}
      </div>
    </>
  );
};

export default BtnsLoginRegister;
