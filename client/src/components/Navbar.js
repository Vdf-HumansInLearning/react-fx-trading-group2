import React from "react";

function Navbar({ handleLogout }) {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <a className="navbar-brand">
        <img
          src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
          alt="logo"
          width="85px"
          height="100%"
        />
      </a>
      <button
        className="btn btn-outline-secondary"
        id="logoutBtn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav >
  );
}

export default Navbar;
