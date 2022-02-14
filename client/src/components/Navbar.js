import React from "react";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light mb-3">
        <a className="navbar-brand">
          <img
            src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/logo-main.svg"
            alt="logo"
            width="85px"
            height="100%"
          />
        </a>
        <a className="btn btn-outline-secondary" role="button" id="logoutBtn">
          Logout
        </a>
      </nav>
    </>
  );
}

export default Navbar;
