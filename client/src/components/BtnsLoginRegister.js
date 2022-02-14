import React from "react";
import { Link } from "react-router-dom";

const BtnsLoginRegister = ({ textContent }) => {
  return (
    <>
      {textContent === "Login" ? (
        <>
          <button id="loginBtn" type="submit" className="main__btn">
            {textContent}
          </button>
          <div className="register">
            <p>
              You don't have an account?
              <Link to="/register" className="link-primary">
                Register
              </Link>
            </p>
          </div>
        </>
      ) : (
        textContent === "Register" && (
          <>
            <button id="submitBtn" type="submit" className="main__btn">
              Register
            </button>
            <div className="register">
              <p>
                Already have an account?
                <Link to="/login" className="link-primary">
                  Login
                </Link>
              </p>
            </div>
          </>
        )
      )}
    </>
  );
};

export default BtnsLoginRegister;
