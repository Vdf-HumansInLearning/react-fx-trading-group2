import Cookies from "js-cookie";
import React from "react";

function Navbar({ clearCookiesOnLogout, eventSourceList }) {
  // if (!eventSourceList) {
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
        <button
          className="btn btn-outline-secondary"
          id="logoutBtn"
          onClick={() => {
            clearCookiesOnLogout("username");
            Cookies.remove("username");
          }
          }
        >
          Logout
        </button>
      </nav>
    </>
  );
}
// else {
// for (let i = 0; i < eventSourceList.length; i++) {
//   eventSourceList[i].eventSourceObj.close();
//   eventSourceList.splice(i, 1)
// }
// return <></>
//}
//}

export default Navbar;
