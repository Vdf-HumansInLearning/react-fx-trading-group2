import { Component } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Cookies from "js-cookie";
import Navbar from "./../components/Navbar";
import Toast from "../components/Toast";
import WidgetAdd from "../components/WidgetAdd";
import WidgetPickCurrency from "../components/WidgetPickCurrency";
import WidgetMain from "../components/WidgetMain";
import "../styles/style-index.css";

let eventSource;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toast: {
        isShown: false,
        toastTitle: "",
        toastMessage: "",
        toastType: "success",
      },
      card: null,
      inputMainCurrency: null,
      inputSecondCurrency: null,
      notional: null,
      tenor: null,
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
      trans: [],
      currencies: [],
      currenciesAvailable: []
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
    this.handleMainCurrency = this.handleMainCurrency.bind(this);
    this.handleSecondCurrency = this.handleSecondCurrency.bind(this);
    this.handleNotional = this.handleNotional.bind(this);
    this.handleTenor = this.handleTenor.bind(this);
    this.clearCookiesOnLogout = this.clearCookiesOnLogout.bind(this);
    this.getData = this.getData.bind(this);
  }

  clearCookiesOnLogout(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.setState({
      toast: {
        isShown: true,
        toastTitle: "Logout successful",
        toastMessage: "You have been logged out!",
        toastType: "success",
      }
    });
    setTimeout(() => {
      this.props.navigate("/login")
    }, 3000);
  };

  getData() {
    const urlPairs = "http://localhost:8080/api/currencies/pairs";
    const urlTransactions = "http://localhost:8080/api/transactions";
    const urlCurrencies = "http://localhost:8080/api/currencies";

    const fetchPairs = fetch(urlPairs);
    const fetchTransactions = fetch(urlTransactions);
    const fetchCurrencies = fetch(urlCurrencies);

    Promise.all([fetchPairs, fetchTransactions, fetchCurrencies])
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((data) => {
        this.setState({
          currencies: data[0],
          trans: data[1],
          currenciesAvailable: data[2]
        })
        console.log(this.state.trans)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevState) {
    if (prevState.trans != this.state.trans) {
      let url = "http://localhost:8080/api/transactions";
      fetch(url)
        .then((res) =>
          res.json().then((data) => ({ status: res.status, body: data }))
        )
        .then((response) => {
          if (response.status === 200) {
            this.setState({ trans: response.body });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  addPickWidget() {
    const { cardId, cards, currenciesAvailable } = this.state;
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
            handleMainCurrency={this.handleMainCurrency}
            handleSecondCurrency={this.handleSecondCurrency}
            currenciesAvailable={currenciesAvailable}
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

  handleMainCurrency(e) {
    this.setState({ inputMainCurrency: e.target.value })
  }

  handleSecondCurrency(e) {
    this.setState({ inputSecondCurrency: e.target.value })
  }

  handleNotional(e) {
    this.setState({ notional: e.target.value })
  }

  handleTenor(e) {
    this.setState({ tenor: e.target.value })
  }

  selectCurrency(cardId) {
    let card = document.getElementById(cardId);
    let btn_confirm_selection = card.querySelector("#btn_confirm_selection");

    btn_confirm_selection.disabled = false;

    if (this.state.inputMainCurrency && this.state.inputSecondCurrency)
      if (
        this.state.inputMainCurrency !== "opt_none" ||
        this.state.inputSecondCurrency !== "opt_none"
      ) {
        //user must choose two different currencies
        if (this.state.inputMainCurrency === this.state.inputSecondCurrency) {
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

    let item = {
      id: cardId,
      buyRate: list[indexCard].sellRate,
      mainCurrency: list[indexCard].secondCurrency,
      secondCurrency: list[indexCard].mainCurrency,
      sellRate: list[indexCard].buyRate,
    }

    list.splice(indexCard, 1, item);

    this.setState({
      mainWidgetItems: list
    })

    let index = allCards.findIndex(
      (i) => i.props.cardIdCounter == Number(cardId)
    );

    if (index >= 0) {
      allCards.splice(
        index,
        1,
        <WidgetMain
          cardIdCounter={cardId}
          key={"mainKey" + cardId}
          closeWidget={this.closeWidget}
          item={item}
          swapCurrencies={this.swapCurrencies}
          sendDataTransactions={this.sendDataTransactions}
          iconSell={"down"}
          iconBuy={"up"}
          handleNotional={this.handleNotional}
          handleTenor={this.handleTenor}
        />
      );
    }
    this.setState({
      mainWidgetItems: list,
      cards: allCards,
    });
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
            iconSell={"down"}
            iconBuy={"up"}
            handleNotional={this.handleNotional}
            handleTenor={this.handleTenor}
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
    if (
      this.state.inputMainCurrency &&
      this.state.inputSecondCurrency &&
      this.state.inputMainCurrency !== "opt_none" &&
      this.state.inputSecondCurrency !== "opt_none"
    ) {
      if (this.state.inputMainCurrency == this.state.inputSecondCurrency) {
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
          base_currency: this.state.inputMainCurrency,
          quote_currency: this.state.inputSecondCurrency,
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
    let mainCurrencyToSend = sendMainCurrency;
    let secondCurrencyToSend = sendSecCurrency;
    let sellOrBuyRateToSend = sellOrBuyRate;

    let userName = Cookies.get("username");

    if (this.state.tenor !== "Choose..." && this.state.notional >= 1) {
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
          notional: this.state.notional,
          tenor: this.state.tenor,
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
        })
    } else if (this.state.notional && this.state.tenor === "Choose...") {
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
    } else if (!this.state.notional && this.state.tenor !== "Choose...") {
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
    } else if (!this.state.notional && this.state.tenor === "Choose...") {
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
    } else if (this.state.notional <= 1) {
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

      let initialSellRate = array[indexItem].sellRate;
      let initialBuyRate = array[indexItem].buyRate;

      array.splice(indexItem, 1, {
        id: currentCardId,
        buyRate: currencyObj.buy,
        mainCurrency: array[indexItem].mainCurrency,
        secondCurrency: array[indexItem].secondCurrency,
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
          iconSell={initialSellRate < currencyObj.sell ? "up" : "down"}
          iconBuy={initialBuyRate < currencyObj.buy ? "up" : "down"}
          handleNotional={this.handleNotional}
          handleTenor={this.handleTenor}
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
    const { toast, cards, trans, currencies, eventSourceList } = this.state;
    return (
      <>
        <Toast
          isShown={toast.isShown}
          toastTitle={toast.toastTitle}
          toastMessage={toast.toastMessage}
          toastType={toast.toastType}
        />
        <div id="app">
          <Navbar clearCookiesOnLogout={this.clearCookiesOnLogout} eventSourceList={eventSourceList} />
          <main className="container-fluid row mb-5">
            <section className="col-sm-12 col-md-12 col-lg-6">
              {/* <Navbar eventSourceList={this.state.eventSourceList} /> */}
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
            {/* {isPending && <div>Loading...</div>}
          {error && <div>{error}</div>} */}
            {this.state.trans.length > 0 && <Table trans={trans} currencies={currencies} />}
          </main>
        </div>
      </>
    );
  }
}

const route = (WrappedComponent) => (props) => {
  const navigate = useNavigate();
  return (
    <WrappedComponent {...props} navigate={navigate} />
  );
};

export default route(Dashboard);