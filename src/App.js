import { useEffect, useState } from "react";
import { Header } from "./components/common/Header";
import { ViewContext } from "./utils/context";
import EmailInputView from "./components/Views/EmailInputView";
import useVisaCheckout from "./utils/hooks/useVisaCheckout";
import { VIEWS } from "./utils/constants/enums";
import OtpInputView from "./components/Views/OtpInputView";
import SelectCardView from "./components/Views/SelectCardView";
import CheckoutView from "./components/Views/CheckoutView";
import { createOverlay } from "./migration";

const App = () => {
  const [view, setView] = useState("EMAIL_INPUT_VIEW");
  const [cards, setCards] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [maskedValidationChannel, setMaskedValidationChannel] = useState(null);
  const { init } = useVisaCheckout();
  const handleClose = () => {
    console.log("handleClose called");
  };

  const renderView = () => {
    switch (view) {
      case VIEWS.EMAIL:
        return <EmailInputView />;
      case VIEWS.OTP:
        return <OtpInputView />;
      case VIEWS.SELECT_CARD:
        return <SelectCardView />;
      case VIEWS.CHECKOUT:
        return <CheckoutView />;
      default:
        return <div>Unknown View</div>;
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ViewContext.Provider
      value={{
        view,
        setView,
        cards,
        setCards,
        maskedValidationChannel,
        setMaskedValidationChannel,
        selectedCard,
        setSelectedCard,
      }}
    >
      <Header handleClose={handleClose} />
      {renderView()}
    </ViewContext.Provider>
  );
};

export default App;
