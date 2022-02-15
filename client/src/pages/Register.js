import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../components/Aside";
import BtnsLoginRegister from "../components/BtnsLoginRegister";
import Toast from "../components/Toast";
import "../styles/style-auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setConfirmPass] = useState("");

  const [toast, setToast] = useState({
    isShown: false,
    toastTitle: "",
    toastMessage: "",
    toastType: "success",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    let url = "http://localhost:8080/api/auth/register";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        repassword: repassword,
      }),
    })
      .then((res) =>
        res.json().then((data) => ({
          status: res.status,
          body: data,
        }))
      )
      .then((data) => {
        if (data.status === 200) {
          setToast({
            isShown: true,
            toastTitle: "Registration success",
            toastMessage: "You have been successfully registered!",
            toastType: "success",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else if (data.status === 409) {
          if (data.body.existing === "username") {
            setToast({ isShown: true, toastMessage: data.body.message });
            setTimeout(() => {
              setToast({ isShown: false });
            }, 2000);
          } else if (data.body.existing === "email") {
            setToast({ isShown: true, toastMessage: data.body.message });
            setTimeout(() => {
              setToast({ isShown: false });
            }, 2000);
          }
        } else {
          setToast(true, "Error", "Registration failed.", "fail");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex">
      <Toast
        isShown={toast.isShown}
        toastTitle={toast.toastTitle}
        toastMessage={toast.toastMessage}
        toastType={toast.toastType}
      />
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
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>
            <BtnsLoginRegister
              textContent={"Register"}
              handleRegister={handleRegister}
            />
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
