import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <>
        <main className="body-container-404">
          <div className="main__container404">
            <img
              className="background_img"
              src="https://raw.githubusercontent.com/WebToLearn/fx-trading-app/master/App/ui/src/assets/img/error_404.png"
              alt="logo404"
            />
            <div className="message_container">
              <p className="help-block-404">
                Sorry, the page your are looking for does not exist
              </p>
            </div>
            <div className="button__container404">
              <Link to="/login">
                <button className="btn btn-primary main__button404">
                  Go to login
                </button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default NotFound;
