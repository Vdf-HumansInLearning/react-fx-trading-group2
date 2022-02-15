import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";
import Toast from "../components/Toast";
import "../styles/style-auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({
    isShown: false,
    toastTitle: "",
    toastMessage: "",
    toastType: "success",
  });

  const createCookie = (name, value, days) => {
    var date, expires;
    if (days) {
      date = new Date();
      date.setDate(date.getDate() + days);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    let url = "http://localhost:8080/api/auth/login";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((response) => {
        let username = response.body.username;
        if (response.status === 200) {
          createCookie("username", username, 2)
          setToast({
            isShown: true,
            toastTitle: "Login successful",
            toastMessage: "You'll be logged in!",
            toastType: "success",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setToast({
            isShown: true,
            toastTitle: "Login failed",
            toastMessage: "Try again!",
            toastType: "fail",
          });
          setTimeout(() => {
            setToast({ isShown: false });
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Toast
        isShown={toast.isShown}
        toastTitle={toast.toastTitle}
        toastMessage={toast.toastMessage}
        toastType={toast.toastType}
      />
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
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
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
                  onChange={(e) => setPassword(e.target.value)}
                  defaultValue={password}
                />
              </div>
              <BtnsLoginRegister
                handleLogin={handleLogin}
                textContent={"Login"}
              />
            </form>
          </div>
          <img
            className="mobile__image"
            src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
            alt="logo"
          ></img>
        </main>
      </div>
    </>
  );
};

export default Login;
