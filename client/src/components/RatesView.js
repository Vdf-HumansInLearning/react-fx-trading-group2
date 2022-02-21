import React, { Component, useState, useEffect, useRef } from "react";
import WidgetAdd from "./WidgetAdd";
import "../styles/style-index.css";
import WidgetPickCurrency from "./WidgetPickCurrency";
import Toast from "./Toast";
import WidgetMain from "./WidgetMain";

class RatesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast: {
        isShown: false,
        toastTitle: "",
        toastMessage: "",
        toastType: "success",
      },
      cards: [],
      cardId: 0,
      item: {
        mainCurrency: "",
        secondCurrency: "",
        sellRate: 0,
        buyRate: 0,
      },
    };

    this.addPickWidget = this.addPickWidget.bind(this);
    this.addNewWidget = this.addNewWidget.bind(this);
    this.closeWidget = this.closeWidget.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.confirmSelectionCurrency = this.confirmSelectionCurrency.bind(this);
  }

  addPickWidget() {
    const { cardId, cards } = this.state;
    if (cards.length < 5) {
      this.setState({
        cards: [
          ...cards,
          <WidgetPickCurrency
            cardIdCounter={cardId}
            key={"key" + cardId}
            closeWidget={this.closeWidget}
            selectCurrency={this.selectCurrency}
            confirmSelectionCurrency={this.confirmSelectionCurrency}
          />,
        ],
      });
      this.setState({ cardId: cardId + 1 });
    } else {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Error",
          toastMessage: "You cannot have more than 5 widgets on the page.",
          toastType: "fail",
        },
      });
    }
    setTimeout(() => {
      this.setState({
        toast: {
          isShown: false,
        },
      });
    }, 3000);
  }

  closeWidget(cardId) {
    let { cards } = this.state
    if (cardId.startsWith("pickCard")) {
      let id = cardId.substring(8);
      this.setState({
        cards: cards.filter((i) =>
          i.props.cardIdCounter !== Number(id))
      })
    } else if (cardId.startsWith("card")) {
      let id = cardId.substring(4);
      this.setState({
        cards: cards.filter((i) => (i.props.cardIdCounter) !== Number(id))
      });
      //stop(cardId);
    }
  }

  selectCurrency(cardId) {
    let card = document.getElementById(cardId);
    let inputMainCurrency = card.querySelector("#inputMainCurrency");
    let inputSecondCurrency = card.querySelector("#inputSecondCurrency");
    let btn_confirm_selection = card.querySelector("#btn_confirm_selection");
    btn_confirm_selection.disabled = false;
    if (inputMainCurrency && inputSecondCurrency)
      if (
        inputMainCurrency.value !== "opt_none" ||
        inputSecondCurrency.value !== "opt_none"
      ) {
        //user must choose two different currencies
        if (inputMainCurrency.value == inputSecondCurrency.value) {
          this.setState({
            toast: {
              isShown: true,
              toastTitle: "Error",
              toastMessage: "You must choose two different currencies.",
              toastType: "fail",
            },
          });
          btn_confirm_selection.disabled = true;
          setTimeout(() => {
            this.setState({
              toast: {
                isShown: false,
              },
            });
          }, 2000);
        }
      }
  }

  addNewWidget(cardId) {
    //no more that 5 cards
    if (this.state.cards.length < 5) {
      //const newWidget = createMainWidget(item);
      this.setState({
        cards: [
          ...this.state.cards,
          <WidgetMain
            cardIdCounter={cardId}
            key={"key" + cardId}
            closeWidget={this.closeWidget}
            item={this.state.item}
          />,
        ],
      });

      this.setState({ cardId: this.state.cardId + 1 });
      //   cardsRow.prepend(newWidget);
      //   let currentInputId = `swapp${inputId}`;
      //   let swappId = document.getElementById(currentInputId);
      //   swappId.addEventListener("click", () => {
      //     let numberIdToSwap = currentInputId.substring(5);
      //     let mainCurrencyToSwap = document
      //       .querySelector(`#mainCurrency${numberIdToSwap}`)
      //       .getAttribute("value");
      //     let secondCurrencyToSwap = document
      //       .querySelector(`#secondCurrency${numberIdToSwap}`)
      //       .getAttribute("value");
      //     let sellValueToSwap = document
      //       .querySelector(`#sellRate${numberIdToSwap}`)
      //       .getAttribute("value");
      //     let buyValueToSwap = document
      //       .querySelector(`#buyRate${numberIdToSwap}`)
      //       .getAttribute("value");
      //     let tempMainCurrency = secondCurrencyToSwap;
      //     let tempSecondCurrency = mainCurrencyToSwap;
      //     let tempSellValue = buyValueToSwap;
      //     let tempBuyValue = sellValueToSwap;
      //     document.getElementById(`mainCurrency${numberIdToSwap}`).textContent =
      //       tempMainCurrency;
      //     document
      //       .getElementById(`mainCurrency${numberIdToSwap}`)
      //       .setAttribute("value", tempMainCurrency);
      //     document.getElementById(`secondCurrency${numberIdToSwap}`).textContent =
      //       tempSecondCurrency;
      //     document
      //       .getElementById(`secondCurrency${numberIdToSwap}`)
      //       .setAttribute("value", tempSecondCurrency);
      //     document.getElementById(`sellRate${numberIdToSwap}`).textContent =
      //       tempSellValue;
      //     document
      //       .getElementById(`sellRate${numberIdToSwap}`)
      //       .setAttribute("value", tempSellValue);
      //     document.getElementById(`buyRate${numberIdToSwap}`).textContent =
      //       tempBuyValue;
      //     document
      //       .getElementById(`buyRate${numberIdToSwap}`)
      //       .setAttribute("value", tempBuyValue);
      //     swapIcons(numberIdToSwap);
      //   });
      //   closeWidget(cardId);
      //   mainWidgetsNr++;
    } else {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Error",
          toastMessage: "You cannot have more than 5 widgets on the page.",
          toastType: "fail",
        },
      });
      setTimeout(() => {
        this.setState({
          toast: {
            isShown: false,
          },
        });
      }, 2000);
    }
  }

  confirmSelectionCurrency(cardId) {
    let card = document.getElementById("pickCard" + cardId);
    let inputMainCurrency = card.querySelector("#inputMainCurrency");
    let inputSecondCurrency = card.querySelector("#inputSecondCurrency");

    if (
      inputMainCurrency.value &&
      inputSecondCurrency.value &&
      inputMainCurrency.value !== "opt_none" &&
      inputSecondCurrency.value !== "opt_none"
    ) {
      if (inputMainCurrency.value == inputSecondCurrency.value) {
        setTimeout(() => {
          this.setState({
            toast: {
              isShown: true,
              toastTitle: "Error",
              toastMessage: "You must choose two different currencies.",
              toastType: "fail",
            },
          });
        }, 2000);
      } else {
        let currencyObj = {
          base_currency: inputMainCurrency.value,
          quote_currency: inputSecondCurrency.value,
        };
        console.log(currencyObj);
        fetch("http://localhost:8080/api/currencies/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currencyObj),
        })
          .then((res) =>
            res.json().then((data) => ({ status: res.status, body: data }))
          )
          .then((response) => {
            if (response.status === 200) {
              //inputId++;
              //populate the item
              console.log("asdasdas");
              this.setState({
                item: {
                  mainCurrency: currencyObj.base_currency,
                  secondCurrency: currencyObj.quote_currency,
                  sellRate: response.body.sell,
                  buyRate: response.body.buy,
                },
              });
              //create the page
              this.addNewWidget(cardId);
              //   start(
              //     currencyObj.base_currency,
              //     currencyObj.quote_currency,
              //     inputId,
              //     currentCardId
              //   );
            } else {
              setTimeout(() => {
                this.setState({
                  toast: {
                    isShown: true,
                    toastTitle: "Error",
                    toastMessage: response.body,
                    toastType: "fail",
                  },
                });
              }, 2000);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    } else {
      setTimeout(() => {
        this.setState({
          toast: {
            isShown: true,
            toastTitle: "Error",
            toastMessage: "Currency fields cannot be empty.",
            toastType: "fail",
          },
        });
      }, 2000);
    }
  }

  render() {
    const { toast, cards } = this.state;
    return (
      <section className="col-sm-12 col-md-12 col-lg-6">
        <Toast
          isShown={toast.isShown}
          toastTitle={toast.toastTitle}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
        <h5 className="color-titles">Fx Rates View</h5>
        <div className="cards-container">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            {cards}
            <WidgetAdd addPickWidget={this.addPickWidget} />
          </div>
        </div>
      </section>
    );
  }
}

export default RatesView;
