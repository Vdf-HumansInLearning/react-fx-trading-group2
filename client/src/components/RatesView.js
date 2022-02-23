import React, { Component } from "react";
import WidgetAdd from "./WidgetAdd";
import "../styles/style-index.css";
import WidgetPickCurrency from "./WidgetPickCurrency";
import Toast from "./Toast";
import WidgetMain from "./WidgetMain";
import Cookies from "js-cookie";

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
      mainWidgetItems: [],
      item: {
        id: 0,
        mainCurrency: "",
        secondCurrency: "",
        sellRate: 0,
        buyRate: 0,
      },
      eventSourceList: [],
    };

    this.addPickWidget = this.addPickWidget.bind(this);
    this.addNewWidget = this.addNewWidget.bind(this);
    this.closeWidget = this.closeWidget.bind(this);
    this.selectCurrency = this.selectCurrency.bind(this);
    this.confirmSelectionCurrency = this.confirmSelectionCurrency.bind(this);
    this.swapCurrencies = this.swapCurrencies.bind(this);
    this.sendDataTransactions = this.sendDataTransactions.bind(this);
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
    let { cards } = this.state;
    if (cardId.startsWith("pickCard")) {
      let id = cardId.substring(8);
      this.setState({
        cards: cards.filter((i) => i.props.cardIdCounter !== Number(id)),
      });
    } else if (cardId.startsWith("card")) {
      let id = cardId.substring(4);
      this.stop(id);
      let array = [...this.state.mainWidgetItems];
      let indexItem = array.findIndex(
        (item, index) => this.state.mainWidgetItems[index].id === Number(id)
      );

      array.splice(indexItem, 1);
      this.setState({
        cards: cards.filter((i) => i.props.cardIdCounter !== Number(id)),
        selectCurrency: array,
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
        if (inputMainCurrency.value === inputSecondCurrency.value) {
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

  swapCurrencies(cardId) {
    let list = [...this.state.mainWidgetItems];
    let allCards = [...this.state.cards];

    let indexCard = list.findIndex((i) => i.id == Number(cardId));

    list.splice(indexCard, 1, {
      id: cardId,
      buyRate: list[indexCard].sellRate,
      mainCurrency: list[indexCard].secondCurrency,
      secondCurrency: list[indexCard].mainCurrency,
      sellRate: list[indexCard].buyRate,
    });

    let index = allCards.findIndex(
      (i) => i.props.cardIdCounter == Number(cardId)
    );
    console.log(index);
    allCards.splice(
      index,
      1,
      <WidgetMain
        cardIdCounter={cardId}
        key={"mainKey" + cardId}
        closeWidget={this.closeWidget}
        item={list[indexCard]}
        swapCurrencies={this.swapCurrencies}
        sendDataTransactions={this.sendDataTransactions}
      />
    );

    this.setState({
      mainWidgetItems: list,
      cards: allCards,
    });
    this.stop(cardId);
    this.start(
      list[indexCard].mainCurrency,
      list[indexCard].secondCurrency,
      cardId
    );
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
            swapCurrencies={this.swapCurrencies}
            sendDataTransactions={this.sendDataTransactions}
          />,
        ],
      });

      this.setState({ cardId: this.state.cardId + 1 });
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
              this.setState({
                item: {
                  id: cardId,
                  mainCurrency: currencyObj.base_currency,
                  secondCurrency: currencyObj.quote_currency,
                  sellRate: response.body.sell,
                  buyRate: response.body.buy,
                },
                mainWidgetItems: [
                  ...this.state.mainWidgetItems,
                  {
                    id: cardId,
                    mainCurrency: currencyObj.base_currency,
                    secondCurrency: currencyObj.quote_currency,
                    sellRate: response.body.sell,
                    buyRate: response.body.buy,
                  },
                ],
              });
              //create the page
              this.closeWidget("pickCard" + cardId);
              this.addNewWidget(cardId);
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

  sendDataTransactions(
    action,
    sendMainCurrency,
    sendSecCurrency,
    sellOrBuyRate,
    inputIdtoSendNotional,
    inputIdToSendTenor
  ) {
    let notional = document.getElementById(inputIdtoSendNotional).value;
    let tenor = document.getElementById(inputIdToSendTenor).value;
    // let mainCurrencyToSend =
    //   document.getElementById(sendMainCurrency).defaultValue;
    // let secondCurrencyToSend =
    //   document.getElementById(sendSecCurrency).defaultValue;

    // let sellOrBuyRateToSend =
    //   document.getElementById(sellOrBuyRate).defaultValue;
    let mainCurrencyToSend = sendMainCurrency;
    let secondCurrencyToSend = sendSecCurrency;
    let sellOrBuyRateToSend = sellOrBuyRate;

    let userName = Cookies.get("username");

    if (tenor !== "Choose..." && notional >= 1) {
      let actionSellOrBuy = action;
      const monthNames = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
      const dateObj = new Date();
      const month = monthNames[dateObj.getMonth()];
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }
      let h = addZero(dateObj.getHours());
      let m = addZero(dateObj.getMinutes());
      let time = h + ":" + m;
      const outputDate = day + "/" + month + "/" + year;

      let url = "http://localhost:8080/api/transactions";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${userName}`,
          ccy_pair: `${mainCurrencyToSend}/${secondCurrencyToSend}`,
          rate: sellOrBuyRateToSend,
          action: actionSellOrBuy,
          notional: notional,
          tenor: tenor,
          trans_date: outputDate,
          trans_hour: time,
        }),
      })
        .then((res) =>
          res
            .json()
            .then((data) => ({ status: res.status, body: data.message }))
        )
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              toast: {
                isShown: true,
                toastTitle: "Success",
                toastMessage: "Transaction completed!",
                toastType: "success",
              },
            });
            setTimeout(() => {
              this.setState({
                toast: {
                  isShown: false,
                },
              });
            }, 2000);
            document.getElementById(inputIdtoSendNotional).value = null;
            document.getElementById(inputIdToSendTenor).value =
              document.getElementById(inputIdToSendTenor).options[0].value;
          } else {
            this.setState({
              toast: {
                isShown: true,
                toastTitle: "Failure",
                toastMessage: "Transaction failed.",
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
        });
      // .then(
      //   fetch(url, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }).then((res) =>
      //     res.json().then((data) => {
      //       tableRegistrations = data;
      //       const tableBody = document.getElementById("table-body");
      //       if (tableBody) {
      //         cleanup(tableBody);
      //       }
      //       for (let i = 0; i < tableRegistrations.length; i++) {
      //         const registration = createOneTableRegistration(
      //           tableRegistrations[i],
      //           i + 1
      //         );
      //         tableBody.appendChild(registration);
      //       }
      //     })
      //   )
      // )
      // .catch((error) => {
      //   console.log(error);
      // });
    } else if (notional && tenor === "Choose...") {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Empty field",
          toastMessage: "Please choose a tenor value.",
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
    } else if (!notional && tenor !== "Choose...") {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Empty field",
          toastMessage: "Please choose a National value.",
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
    } else if (!notional && tenor === "Choose...") {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Empty field",
          toastMessage: "Please choose national and tenor values.",
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
    } else if (notional <= 1) {
      this.setState({
        toast: {
          isShown: true,
          toastTitle: "Error",
          toastMessage: "Notional value must be at least 1.",
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

  start(base_currency, quote_currency, currentCardId) {
    console.log(base_currency, quote_currency, currentCardId);
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
      eventSourceList: [
        ...this.state.eventSourceList,
        {
          id: currentCardId,
          eventSourceObj: eventSource,
        },
      ],
    });

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

      let array = [...this.state.mainWidgetItems];
      let indexItem = array.findIndex(
        (item, index) =>
          this.state.mainWidgetItems[index].id === Number(currentCardId)
      );
      let arrayWidget = [...this.state.cards];

      array.splice(indexItem, 1, {
        id: currentCardId,
        buyRate: currencyObj.buy,
        mainCurrency: base_currency,
        secondCurrency: quote_currency,
        sellRate: currencyObj.sell,
      });

      let index1 = arrayWidget.findIndex(
        (item, index) =>
          arrayWidget[index].props.cardIdCounter == Number(currentCardId)
      );

      arrayWidget.splice(
        index1,
        1,
        <WidgetMain
          cardIdCounter={currentCardId}
          key={"mainKey" + currentCardId}
          closeWidget={this.closeWidget}
          item={this.state.mainWidgetItems[indexItem]}
          swapCurrencies={this.swapCurrencies}
          sendDataTransactions={this.sendDataTransactions}
        />
      );

      this.setState({
        mainWidgetItems: array,
        cards: arrayWidget,
      });
    };
  }

  stop(eventSourceId) {
    // when "Stop" button pressed
    if (eventSource) {
      let eventSourceIndex = this.state.eventSourceList.findIndex(
        (item) => item.id == eventSourceId
      );
      let foundEventSource = this.state.eventSourceList.splice(
        eventSourceIndex,
        1
      );
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
