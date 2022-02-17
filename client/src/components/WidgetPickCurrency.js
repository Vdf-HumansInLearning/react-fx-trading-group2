import React from "react";
import useFetch from "./UseFetch";
import "../styles/style-index.css";

const WidgetPickCurrency = ({ cardIdCounter, closeWidget, selectCurrency }) => {
  const { data: currenciesAvailable } = useFetch(
    "http://localhost:8080/api/currencies"
  );

  return (
    <div className="col" id={`pickCard${cardIdCounter}`}>
      <div className="card">
        <div className="card-currency--border px-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <p className="subtitle">Pick a currency</p>
          </div>
          <button
            className="btn-close"
            type="button"
            aria-label="Close"
            onClick={() => closeWidget(`pickCard${cardIdCounter}`)}
          ></button>
        </div>
        <div className="card-input--center mt-3 px-3">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputMainCurrency">
              Primary
            </label>
            <select className="form-select" id="inputMainCurrency">
              <option value="opt_none">Choose...</option>
              {currenciesAvailable &&
                currenciesAvailable.map((i) => (
                  <option value={i} id={i} key={i}>
                    {i}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputSecondCurrency">
              Secondary
            </label>
            <select
              className="form-select"
              id="inputSecondCurrency"
              onChange={() => selectCurrency(`pickCard${cardIdCounter}`)}
            >
              <option value="opt_none">Choose...</option>
              {currenciesAvailable &&
                currenciesAvailable.map((i) => (
                  <option value={i} id={i} key={i}>
                    {i}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="card-actions px-3 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            type="button"
            id="btn_confirm_selection"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetPickCurrency;
