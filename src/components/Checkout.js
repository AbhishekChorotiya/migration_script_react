import { useContext, useEffect } from "react";
import { Header } from "./common/Header";
import EmailInputView from "./Views/EmailInputView";
import OtpInputView from "./Views/OtpInputView";
import SelectCardView from "./Views/SelectCardView";
import CheckoutView from "./Views/CheckoutView";
import LoadingView from "./Views/LoadingView";
import useVisaCheckout from "../utils/hooks/useVisaCheckout";
import { ViewContext } from "../utils/context";
import { VIEWS } from "../utils/constants/enums";

const Checkout = () => {
  const { init, getCards, close } = useVisaCheckout();
  const { view } = useContext(ViewContext);
  const handleClose = () => {
    close();
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
      case VIEWS.LOADING:
        return <LoadingView />;
      default:
        return <div>Unknown View</div>;
    }
  };

  const initializeCheckout = async () => {
    await init();
    await getCards();
  };

  useEffect(() => {
    initializeCheckout();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        fontFamily: "Montserrat",
      }}
    >
      {view !== VIEWS.CHECKOUT && <Header handleClose={handleClose} />}
      {renderView()}
    </div>
  );
};

export default Checkout;
