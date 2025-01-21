console.log("Paze script loaded");

const handlePazeCheckout = async () => {
  console.log("paze button clicked");
  try {
    let digitalWalletAdaptor = window.DIGITAL_WALLET_SDK;
    let initRes = await digitalWalletAdaptor.initialize({
      client: {
        id: "YK2L1TY5GL0Y1UYLYM9O13oRBRPaMPqYO20N34ByCkwn-c6Is",
        name: "Hyperswitch",
        profileId: "Getin",
      },
    });
    console.log("initRes", initRes);
    let canCheckout = await digitalWalletAdaptor.canCheckout({
      emailAddress: "returninguser@paze.com",
    });
    console.log("canCheckout", canCheckout);

    if (canCheckout.consumerPresent) {
      let checkoutRes = await digitalWalletAdaptor.checkout({
        emailAddress: "returninguser@paze.com",
        sessionId: "testSessionId8678",
        actionCode: "START_FLOW",
        intent: "REVIEW_AND_PAY",
        transactionValue: {
          transactionCurrencyCode: "USD",
          transactionAmount: "100.00",
        },
        shippingPreference: "ALL",
        billingPreference: "ZIP_COUNTRY",
      });
      console.log("checkoutRes", checkoutRes);

      let completeTransation = await digitalWalletAdaptor.complete({
        sessionId: "YOUR_SESSION_ID",
        transactionType: "PURCHASE",
        transactionValue: {
          transactionCurrencyCode: "USD",
          transactionAmount: "100.00",
        },
        transactionOptions: {
          billingPreference: "ZIP_COUNTRY",
          payloadTypeIndicator: "ID",
        },
      });
      console.log("completeTransation", completeTransation);
    } else {
      console.log("Consumer not present");
    }
  } catch (e) {
    console.log("paze error", e);
  }
};

const pazeButton = document.getElementById("paze-button");
if (pazeButton) {
  pazeButton.addEventListener("click", () => {
    handlePazeCheckout();
  });
} else {
  console.error("Paze button not found");
}
