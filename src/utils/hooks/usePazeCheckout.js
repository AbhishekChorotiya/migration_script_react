import React from "react";

const usePazeCheckout = () => {
  const digitalWalletSDK = window?.DIGITAL_WALLET_SDK;
  const isSDKReady = typeof digitalWalletSDK !== "undefined";

  const init = () => {
    if (!isSDKReady) {
      console.warn("Digital Wallet SDK not found or not ready.");
      return;
    }
    console.log("paze init");
  };
  const canCheckout = () => {
    console.log("paze canCheckout");
  };
  const checkout = () => {
    console.log("paze checkout");
  };
  const complete = () => {
    console.log("paze complete");
  };
  return {
    init,
    canCheckout,
    checkout,
    complete,
  };
};

export default usePazeCheckout;
