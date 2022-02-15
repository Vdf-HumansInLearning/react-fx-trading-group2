import React from "react";
import "../styles/toast-style.css";

const Toast = ({ isShown, toastTitle, toastMessage, toastType }) => {
  if (isShown == true) {
    return (
      <>
        {toastType === "success" ? (
          <div
            id="liveToast"
            className="toast border-success fade hide"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header text-white bg-success">
              <strong className="me-auto">{toastTitle}</strong>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        ) : (
          <>
            {toastType === "fail" ? (
              <div
                id="liveToast"
                className="toast fade border-danger hide"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header text-white bg-danger">
                  <strong className="me-auto">{toastTitle}</strong>
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
            ) : (
              <div
                id="liveToast"
                className="toast border-warning fade hide"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header text-white bg-warning">
                  <strong className="me-auto">{toastTitle}</strong>
                </div>
                <div className="toast-body">{toastMessage}</div>
              </div>
            )}
          </>
        )}
      </>
    );
  } else return "";
};

export default Toast;
