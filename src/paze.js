export function pazeCheckout(initParams, v1Config) {
  console.log("Paze script loaded");
  console.log("paze init params: ", initParams);
  console.log("paze config: ", v1Config);
  const requiredParams = ["id", "name", "profileId"];
  let hasRequiredParams = true;
  for (let val of requiredParams) {
    if (!initParams[val]) {
      console.error("Missing required parameter:", val);
      hasRequiredParams = false;
    }
  }
  if (!hasRequiredParams) return;

  const PAZE_SDK_URL =
    "https://sandbox.digitalwallet.earlywarning.com/web/resources/js/digitalwallet-sdk.js";
  const CLIENT_CONFIG = {
    id: "YK2L1TY5GL0Y1UYLYM9O13oRBRPaMPqYO20N34ByCkwn-c6Is",
    name: "Hyperswitch",
    profileId: "Getin",
  };
  const TEST_EMAIL = "returninguser@paze.com";
  const TEST_SESSION_ID = "testSessionId8678";
  const TRANSACTION_DETAILS = {
    transactionCurrencyCode: "USD",
    transactionAmount: "100.00",
  };
  const BILLING_PREFERENCE = "ZIP_COUNTRY";

  function loadPazeSdk() {
    const pazeScript = document.createElement("script");
    pazeScript.src = PAZE_SDK_URL;
    pazeScript.onload = () => {
      console.log("Paze SDK loaded successfully.");
    };
    pazeScript.onerror = () => {
      console.error("Failed to load Paze SDK.");
    };
    document.body.appendChild(pazeScript);
  }

  loadPazeSdk();

  async function handlePazeCheckout() {
    console.log("Paze button clicked");

    try {
      const digitalWalletAdaptor = window.DIGITAL_WALLET_SDK;
      if (!digitalWalletAdaptor) {
        console.error(
          "Paze SDK is not initialized. DIGITAL_WALLET_SDK is undefined."
        );
        return;
      }

      const initRes = await digitalWalletAdaptor.initialize({
        client: CLIENT_CONFIG,
      });
      console.log("Initialization Response:", initRes);

      const canCheckout = await digitalWalletAdaptor.canCheckout({
        emailAddress: TEST_EMAIL,
      });
      console.log("Can Checkout Response:", canCheckout);

      if (canCheckout.consumerPresent) {
        const checkoutRes = await digitalWalletAdaptor.checkout({
          emailAddress: TEST_EMAIL,
          sessionId: TEST_SESSION_ID,
          actionCode: "START_FLOW",
          intent: "REVIEW_AND_PAY",
          transactionValue: TRANSACTION_DETAILS,
          shippingPreference: "ALL",
          billingPreference: BILLING_PREFERENCE,
        });
        console.log("Checkout Response:", checkoutRes);

        const element = document.getElementById("paymentStatus");
        if (checkoutRes.result === "COMPLETE") {
          if (element) {
            element.textContent = "Payment Successful";
            element.style.color = "green";
          }
          const completeTransaction = await digitalWalletAdaptor.complete({
            sessionId: TEST_SESSION_ID,
            transactionType: "PURCHASE",
            transactionValue: TRANSACTION_DETAILS,
            transactionOptions: {
              billingPreference: BILLING_PREFERENCE,
              payloadTypeIndicator: "ID",
            },
          });
          console.log("Complete Transaction Response:", completeTransaction);
        } else {
          if (element) {
            element.textContent = "Payment Failed";
            element.style.color = "red";
          }
        }
      } else {
        console.warn("Consumer not present. Cannot proceed with checkout.");
      }
    } catch (error) {
      console.error("Paze Checkout Error:", error);
    }
  }

  const pazeButtonRoot = document.getElementById("paze-button-root");
  let pazeButton = null;
  if (pazeButtonRoot) {
    const button = document.createElement("button");
    const buttonImage = document.createElement("img");
    buttonImage.src =
      "https://www.paze.com/sites/default/files/2023-06/Paze_Button_60x200px%402x.png";
    buttonImage.style = "height: 100%; width: 100%;";
    button.appendChild(buttonImage);
    button.style.cssText =
      "display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; width: 100%;overflow: hidden; height: 100%;background-color: transparent; max-width: 500px; width:200px; height:55px; max-height: 165px";
    pazeButtonRoot.appendChild(button);
    pazeButton = button;
  } else {
    pazeButton = document.getElementById("paze-button");
  }
  if (pazeButton) {
    pazeButton.addEventListener("click", handlePazeCheckout);
  } else {
    console.error("Paze button not found on the page.");
  }
}
