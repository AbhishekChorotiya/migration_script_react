import { useContext } from "react";
import { ViewContext } from "../context";
import { VIEWS } from "../constants/enums";
import { isVsbReady, Vsb } from "../helpers";

const useVisaCheckout = () => {
  const { setView, setCards } = useContext(ViewContext);

  const getCards = async (email = "", otp = null) => {
    if (!isVsbReady) {
      console.warn("VSB is not ready");
      return;
    }
    let userEmail = email || localStorage.getItem("consumerEmail") || null;
    if (!userEmail) {
      setView(VIEWS.EMAIL);
      console.log("taking user email input");
      return;
    }
    console.log("Fetching cards...", otp);
    let consumerIdentity = {
      identityProvider: "SRC",
      identityValue: userEmail,
      identityType: "EMAIL_ADDRESS",
    };
    try {
      const cards = await Vsb.getCards({ consumerIdentity });
      const { actionCode } = cards;
      console.log("===> actionCode", actionCode);

      switch (actionCode) {
        case "SUCCESS":
          console.log("SUCCESS");
          setCards(cards);
          return;
        case "ERROR":
          console.log("ERROR");
          break;
        case "PENDING_CONSUMER_IDV":
          console.log("taking OTP input");
          setView(VIEWS.OTP);
          return;
        default:
          console.log("No cards found >> ", cards.actionCode);
          break;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkout = () => {
    if (!isVsbReady) {
      console.warn("VSB is not ready");
      return;
    }
    console.log("Processing checkout...");
  };

  return {
    getCards,
    checkout,
  };
};

export default useVisaCheckout;
