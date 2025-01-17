import { useContext, useEffect } from "react";
import { ViewContext } from "../context";
import { v2Configurations } from "../../migration";
import { VIEWS } from "../constants/enums";

let Vsb = window?.VSDK;
const isVsbReady = typeof Vsb == "undefined";
const safeCall = (callback) => {
  if (isVsbReady) {
    return callback;
  } else {
    console.warn("Vsb is not ready");
    return () => {};
  }
};
const useVisaCheckout = () => {
  const { view, setView } = useContext(ViewContext);
  const init = async () => {
    console.log("Initializing Visa Checkout...");
    const v2Config = v2Configurations;
    try {
      await Vsb.init(v2Config?.initParams);
    } catch (e) {
      console.error(e);
    }
  };

  const getCards = (email = "", otp = null) => {
    let userEmail = email || localStorage.getItem("consumerEmail") || null;
    if (userEmail) {
    } else {
      setView(VIEWS.EMAIL);
    }

    console.log("Fetching cards...", otp);
  };

  const checkout = () => {
    console.log("Processing checkout...");
  };

  return {
    init: safeCall(init),
    getCards: safeCall(getCards),
    checkout: safeCall(checkout),
  };
};

export default useVisaCheckout;
