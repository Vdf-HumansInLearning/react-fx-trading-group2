import React, { Component, useState, useEffect, useRef } from "react";
import WidgetAdd from "./WidgetAdd";
import "../styles/style-index.css";
import WidgetPickCurrency from "./WidgetPickCurrency";
import Toast from "./Toast";
import WidgetMain from "./WidgetMain";

let eventSource;
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
      sendSelectedCurrency: [],
      item: {
        id: 0,
        mainCurrency: "",
        secondCurrency: "",
        sellRate: 0,
        buyRate: 0,
      },
      eventSourceList: []
    };

    this.addPickWidget = this.addPickWidget.bind(this);
    this.addNewWidget = this.addNewWidget.bind(this);
    this.closeWidget = this.closeWidget.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.confirmSelectionCurrency = this.confirmSelectionCurrency.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  addPickWidget() {
    const { cardId, cards } = this.state;
    if (cards.length < 5) {
      this.setState({
        cards: [
          ...cards,
          <WidgetPickCurrency
            cardIdCounter={cardId}
            key={"pickKey" + cardId}
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
      this.stop(id);
      let array = [...this.state.sendSelectedCurrency];
      let indexItem = array.findIndex(
        (item, index) => this.state.sendSelectedCurrency[index].id == Number(id)
      );

      array.splice(indexItem, 1);
      this.setState({
        cards: cards.filter((i) => (i.props.cardIdCounter) !== Number(id)),
        selectCurrency: array
      });
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
            key={"mainKey" + cardId}
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
                  id: cardId,
                  mainCurrency: currencyObj.base_currency,
                  secondCurrency: currencyObj.quote_currency,
                  sellRate: response.body.sell,
                  buyRate: response.body.buy,
                },
                sendSelectedCurrency: [...this.state.sendSelectedCurrency, {
                  id: cardId,
                  mainCurrency: currencyObj.base_currency,
                  secondCurrency: currencyObj.quote_currency,
                  sellRate: response.body.sell,
                  buyRate: response.body.buy,
                }]
              });
              //create the page
              this.closeWidget('pickCard' + cardId)
              this.addNewWidget(cardId);
              ;
              this.start(
                currencyObj.base_currency,
                currencyObj.quote_currency,
                cardId
              );
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

  start(base_currency, quote_currency, currentCardId) {
    console.log(base_currency, quote_currency, currentCardId)
    const baseUrl = "http://localhost:8080/api/";
    // when "Start" button pressed
    if (!window.EventSource) {
      // IE or an old browser
      alert("The browser doesn't support EventSource.");
      return;
    }

    eventSource = new EventSource(
      baseUrl +
      `currencies/quote?base_currency=${base_currency}&quote_currency=${quote_currency}`
    );

    console.log(eventSource);

    this.setState({
      eventSourceList: [...this.state.eventSourceList, {
        id: currentCardId,
        eventSourceObj: eventSource
      }]
    })

    eventSource.onopen = (e) => {
      console.log("Event: open");
    };

    eventSource.onerror = (e) => {
      console.log("Event: error");
      if (this.readyState === EventSource.CONNECTING) {
        console.log(`Reconnecting (readyState=${this.readyState})...`);
      } else {
        console.log("Error has occurred.");
      }
    };

    eventSource.onmessage = (e) => {
      let currencyObj = JSON.parse(e.data);
      console.log(currencyObj);
      //populate the itemstop

      let array = [...this.state.sendSelectedCurrency];
      let indexItem = array.findIndex(
        (item, index) => this.state.sendSelectedCurrency[index].id === Number(currentCardId)
      );
      let arrayWidget = [...this.state.cards];

      array.splice(indexItem, 1, {
        id: currentCardId,
        buyRate: currencyObj.buy,
        mainCurrency: base_currency,
        secondCurrency: quote_currency,
        sellRate: currencyObj.sell
      });

      let index1 = arrayWidget.findIndex(
        (item, index) => arrayWidget[index].props.cardIdCounter == Number(currentCardId)
      );

      console.log(index1)
      arrayWidget.splice(
        index1,
        1,
        <WidgetMain
          cardIdCounter={currentCardId}
          key={"mainKey" + currentCardId}
          closeWidget={this.closeWidget}
          item={this.state.sendSelectedCurrency[indexItem]}
        />
      );

      this.setState({
        sendSelectedCurrency: array,
        cards: arrayWidget
      });
    };
  }

  stop(eventSourceId) {
    // when "Stop" button pressed
    if (eventSource) {
      let eventSourceIndex = this.state.eventSourceList.findIndex(
        (item) => item.id == eventSourceId
      );
      let foundEventSource = this.state.eventSourceList.splice(eventSourceIndex, 1);
      foundEventSource[0].eventSourceObj.close();
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
