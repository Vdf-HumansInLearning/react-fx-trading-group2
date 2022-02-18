import React, { useEffect, useRef, useState } from "react";
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
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [toast, setToast] = useState({
    isShown: false,
    toastTitle: "",
    toastMessage: "",
    toastType: "success",
  });

  const validateUser = () => {
    let usernameRegExp = /^[a-zA-Z ,.'-]{3,20}$/;
    let emailRegExp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let passRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegExp.test(username)) {
      setIsValid(false);
      setError({
        username:
          "Username should have between 3 and 20 characters. It cannot contain numbers",
        email: "",
        password: "",
        repassword: "",
      });
    } else if (!email) {
      setIsValid(false);
      setError({
        username: "",
        email: "Email is required!",
        password: "",
        repassword: "",
      });
    } else if (!emailRegExp.test(email)) {
      setIsValid(false);
      setError({
        username: "",
        email: "Invalid! Email should contain '@' and a domain!",
        password: "",
        repassword: "",
      });
    } else if (!passRegExp.test(password)) {
      setIsValid(false);
      setError({
        username: "",
        email: "",
        password:
          "Invalid! Password must be 8 characters long and must contain at least: one uppercase, one lowercase, a number and a special character!",
        repassword: "",
      });
    } else if (password !== repassword) {
      setIsValid(false);
      setError({
        username: "",
        email: "",
        password: "",
        repassword: "Password do not match!",
      });
    } else {
      setIsValid(true);
      setError({
        username: "",
        email: "",
        password: "",
        repassword: "",
      });
    }
    return isValid;
  };

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    validateUser();
  }, [username, email, password, repassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (isValid) {
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
    }
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
              <div id="error-modal">{error?.username}</div>
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
              <div id="error-modal">{error?.email}</div>
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
              <div id="error-modal">{error?.password}</div>
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
              <div id="error-modal">{error?.repassword}</div>
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
