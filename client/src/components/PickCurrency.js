import React from "react";
import "../styles/style-index.css";

const PickCurrency = () => {
  return (
    <>
      <div className="card">
        <div className="card-currency--border px-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <p className="subtitle">Pick a currency</p>
          </div>
          <button
            className="btn-close"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <div className="card-input--center mt-3 px-3">
          <div className="input-group mb-3">
            <label className="input-group-text" for="inputMainCurrency">
              Primary
            </label>
            <select className="form-select" id="inputMainCurrency">
              <option defaultValue="opt_none">Choose...</option>
              <option defaultValue="USD">USD</option>
              <option defaultValue="EUR">EUR</option>
              <option defaultValue="GBP">GBP</option>
              <option defaultValue="RON">RON</option>
              <option defaultValue="CHF">CHF</option>
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" for="inputSecondCurrency">
              Secondary
            </label>
            <select className="form-select" id="inputSecondCurrency">
              <option defaultValue="opt_none">Choose...</option>
              <option defaultValue="USD">USD</option>
              <option defaultValue="EUR">EUR</option>
              <option defaultValue="GBP">GBP</option>
              <option defaultValue="RON">RON</option>
              <option defaultValue="CHF">CHF</option>
            </select>
          </div>
        </div>
        <div className="card-actions px-3 d-flex justify-content-end">
          <button className="btn btn-primary" type="button">
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default PickCurrency;
