import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import RatesView from "../components/RatesView";
import Navbar from "./../components/Navbar";
import Toast from "../components/Toast";
import useFetch from "../components/UseFetch";

import '../styles/style-index.css'

function Dashboard() {

  const { data: trans, error, isPending } = useFetch(`http://localhost:8080/api/transactions`);
  const { data: currencies } = useFetch(`http://localhost:8080/api/currencies/pairs`);

  const navigate = useNavigate();
  const [toast, setToast] = useState({
    isShown: false,
    toastTitle: "",
    toastMessage: "",
    toastType: "success",
  });

  const clearCookiesOnLogout = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setToast({
      isShown: true,
      toastTitle: "Logout successful",
      toastMessage: "You have been logged out!",
      toastType: "success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  return (
    <>
      <Toast
        isShown={toast.isShown}
        toastTitle={toast.toastTitle}
        toastMessage={toast.toastMessage}
        toastType={toast.toastType}
      />
      <div id="app">
        <Navbar clearCookiesOnLogout={clearCookiesOnLogout} />
        <main className="container-fluid row mb-5">
          <RatesView />
          {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {trans &&
            < Table trans={trans} currencies={currencies} />
          }
        </main>
      </div>
    </>
  );
}

export default Dashboard;
