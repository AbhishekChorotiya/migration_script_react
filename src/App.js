import { useState } from "react";
import { VIEWS } from "./utils/constants/enums";
import Checkout from "./components/Checkout";
import { Provider, useAtom } from "jotai";
import {
  viewAtom,
  cardsAtom,
  selectedCardAtom,
  consumerEmailAtom,
  maskedValidationChannelAtom,
} from "./utils/atoms";

const App = () => {
  const [view, setView] = useAtom(viewAtom);
  const [cards, setCards] = useAtom(cardsAtom);
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [consumerEmail, setConsumerEmail] = useAtom(consumerEmailAtom);
  const [maskedValidationChannel, setMaskedValidationChannel] = useAtom(
    maskedValidationChannelAtom
  );

  // Initialize consumerEmail from localStorage if it exists
  useState(() => {
    const storedEmail = localStorage.getItem("consumerEmail");
    if (storedEmail) {
      setConsumerEmail(storedEmail);
    }
  });

  return (
    <Provider>
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
    </Provider>
  );
};

export default App;
