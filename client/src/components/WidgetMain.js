import React from "react";
import "../styles/style-index.css";

const WidgetMain = ({
  cardIdCounter,
  item,
  closeWidget,
  swapCurrencies,
  sendDataTransactions,
  iconSell,
  iconBuy,
  handleNotional,
  handleTenor
}) => {
  return (
    <div className="col" id={`card${cardIdCounter}`}>
      <div className="card">
        <div className="card-currency px-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <p className="subtitle">
              <span
                className="text-large "
                id={`mainCurrency${cardIdCounter}`}
                defaultValue={item.mainCurrency}
              >
                {item.mainCurrency}
              </span>
              <span>/</span>
              <span
                className="secondCurrency"
                id={`secondCurrency${cardIdCounter}`}
                defaultValue={item.secondCurrency}
              >
                {item.secondCurrency}
              </span>
            </p>
            <div className="icon-exchange">
              <i
                className="fas fa-exchange-alt"
                id={`swap${cardIdCounter}`}
                onClick={() => swapCurrencies(cardIdCounter)}
              ></i>
            </div>
          </div>
          <button
            className="btn-close"
            type="button"
            aria-label="Close"
            onClick={() => closeWidget(`card${cardIdCounter}`)}
          ></button>
        </div>
        <div className="card-rates px-3 d-flex justify-content-between">
          <p className="subtitle mb-0">
            SELL:{" "}
            <span
              className="text-large"
              defaultValue={item.sellRate}
              id={`sellRate${cardIdCounter}`}
            >
              {item.sellRate}
            </span>
            <span className={`icon-${iconSell}`}>
              <i
                className={`fas fa-caret-${iconSell}`}
                id={`iconDown${cardIdCounter}`}
              ></i>
            </span>
          </p>
          <p className="subtitle mb-0">
            BUY:{" "}
            <span
              className="text-large"
              defaultValue={item.buyRate}
              id={`buyRate${cardIdCounter}`}
            >
              {item.buyRate}
            </span>
            <span className={`icon-${iconBuy}`}>
              <i
                className={`fas fa-caret-${iconBuy}`}
                id={`iconUp${cardIdCounter}`}
              ></i>
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
              id={`inputDate${cardIdCounter}`}
              name="dateInput"
              placeholder="Amount"
              onChange={handleNotional}
              min="1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <label
              className="input-group-text"
              htmlFor={`inputCcy${cardIdCounter}`}
            >
              Tenor
            </label>
            <select className="form-select" id={`inputCcy${cardIdCounter}`} onChange={handleTenor}>
              <option value={true} id="optionDefault">
                Choose...
              </option>
              <option value="Spot">Spot</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Month</option>
            </select>
          </div>
        </div>
        <div className="card-actions px-3 d-flex justify-content-between">
          <button
            className="btn btn-success"
            type="button"
            id="sellBtn"
            onClick={() =>
              sendDataTransactions(
                "sell",
                item.mainCurrency,
                item.secondCurrency,
                item.sellRate,
                `inputDate${cardIdCounter}`,
                `inputCcy${cardIdCounter}`
              )
            }
          >
            Sell
          </button>
          <button
            className="btn btn-primary"
            type="button"
            id="buyBtn"
            onClick={() =>
              sendDataTransactions(
                "buy",
                item.mainCurrency,
                item.secondCurrency,
                item.buyRate,
                `inputDate${cardIdCounter}`,
                `inputCcy${cardIdCounter}`
              )
            }
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetMain;
