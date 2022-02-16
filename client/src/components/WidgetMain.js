import React from "react";
import "../styles/style-index.css";

const WidgetMain = () => {
  return (
    <div className="col">
      <div className="card">
        <div className="card-currency px-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <p className="subtitle">
              <span className="text-large " id="mainCurrency1" value="USD">
                USD
              </span>
              <span>/</span>
              <span className="secondCurrency" id="secondCurrency1" value="EUR">
                EUR
              </span>
            </p>
            <div className="icon-exchange">
              <i className="fas fa-exchange-alt" id="swapp1"></i>
            </div>
          </div>
          <button
            className="btn-close"
            type="button"
            aria-label="Close"
          ></button>
        </div>
        <div className="card-rates px-3 d-flex justify-content-between">
          <p className="subtitle mb-0">
            SELL:{" "}
            <span className="text-large" value="0.82" id="sellRate1">
              0.82
            </span>
            <span className="icon-up">
              <i className="fas fa-caret-up" id="iconDown1"></i>
            </span>
          </p>
          <p className="subtitle mb-0">
            BUY:{" "}
            <span className="text-large" value="1.11" id="buyRate1">
              1.11
            </span>
            <span className="icon-down">
              <i className="fas fa-caret-down" id="iconUp1"></i>
            </span>
          </p>
        </div>
        <div className="card-input mt-3 px-3">
          <div className="input-group mb-3">
            <span className="input-group-text" id='"inputNotional"'>
              Notional
            </span>
            <input
              className="form-control"
              type="number"
              id="inputDate1"
              placeholder="Amount"
              min="1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputCcy1">
              Tenor
            </label>
            <select className="form-select" id="inputCcy1">
              <option selected="true" id="optionDefault">
                Choose...
              </option>
              <option value="Spot">Spot</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Month</option>
            </select>
          </div>
        </div>
        <div className="card-actions px-3 d-flex justify-content-between">
          <button className="btn btn-success" type="button" id="sellBtn">
            Sell
          </button>
          <button className="btn btn-primary" type="button" id="buyBtn">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetMain;
