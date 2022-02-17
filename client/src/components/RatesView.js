import React, { useState } from "react";
import WidgetAdd from "./WidgetAdd";
import "../styles/style-index.css";
import WidgetPickCurrency from "./WidgetPickCurrency";
import Toast from "./Toast";

function RatesView() {
  const [toast, setToast] = useState({
    isShown: false,
    toastTitle: "",
    toastMessage: "",
    toastType: "success",
  });

  const [cards, setCards] = useState([]);
  const [main, setMain] = useState(0);
  const [pick, setPick] = useState(0);
  const [cardId, setCardId] = useState(0);

  const addPickWidget = () => {
    if (pick + main <= 4) {
      setCards([
        ...cards,
        <WidgetPickCurrency
          cardIdCounter={cardId}
          key={cardId}
          closeWidget={closeWidget}
        />,
      ]);
      setPick(pick + 1);
      setCardId(cardId + 1);
    } else {
      setToast({
        isShown: true,
        toastTitle: "Error",
        toastMessage: "You can only have 5 widgets on page!",
        toastType: "fail",
      });
    }
  };

  function closeWidget(cardId) {
    if (cardId.startsWith("pickCard")) {
      document.getElementById(cardId).remove();
      setPick(pick - 1);
    } else {
      setMain(main - 1);
      //stop(cardId);
    }
  }

  function deleteWidget(cardId) {}

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
          <WidgetAdd addPickWidget={addPickWidget} />
        </div>
      </div>
    </section>
  );
}

export default RatesView;
