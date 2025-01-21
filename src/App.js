import { useState } from "react";
import { ViewContext } from "./utils/context";
import { VIEWS } from "./utils/constants/enums";
import Checkout from "./components/Checkout";

const App = () => {
  const [view, setView] = useState(VIEWS.LOADING);
  const [cards, setCards] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [consumerEmail, setConsumerEmail] = useState(
    localStorage.getItem("consumerEmail") || ""
  );
  const [maskedValidationChannel, setMaskedValidationChannel] = useState(null);

  return (
    <ViewContext.Provider
      value={{
        view,
        consumerEmail,
        setConsumerEmail,
        setView,
        cards,
        setCards,
        maskedValidationChannel,
        setMaskedValidationChannel,
        selectedCard,
        setSelectedCard,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        }}
      >
        <Checkout />
      </div>
    </ViewContext.Provider>
  );
};

export default App;
