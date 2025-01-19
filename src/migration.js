const initCheckoutButton = (cardBrands) => {
  let queryString = "";
  if (cardBrands?.length) {
    queryString = "&orderedCardBrands=" + cardBrands.join(",");
  } else {
    queryString += "&orderedCardBrands=ALL";
  }
  let imageUrl =
    "https://sandbox-assets.secure.checkout.visa.com/wallet-services-web/xo/button.png?cardBrands=VISA%2CMASTERCARD%2CDISCOVER%2CAMEX&animation=true&legacy=false&svg=true";

  if (queryString) imageUrl += queryString;

  let v1Button = document.getElementsByClassName("v-button")[0];
  if (v1Button) {
    v1Button.src = imageUrl;
    v1Button.addEventListener("click", () => {
      console.log("V1 button clicked");
      let visaCheckoutElement = document.getElementById("visaCheckout");
      if (visaCheckoutElement) {
        console.log("Visa checkout element already exists");
        return;
      }
      visaCheckoutElement = document.createElement("visa-checkout");
      visaCheckoutElement.setAttribute("id", "visaCheckout");
      document.body.appendChild(visaCheckoutElement);
    });
  } else {
    console.warn("V1 button not found");
  }
};

const buildV2InitializeConfig = (initDataV1) => {
  console.log("V1", initDataV1);
  const initDataV2 = {
    dpaTransactionOptions: {},
  };

  if (initDataV1.settings?.locale) {
    initDataV2.dpaTransactionOptions.dpaLocale = initDataV1.settings.locale;
  }

  if (
    initDataV1.paymentRequest?.subtotal &&
    initDataV1.paymentRequest.currencyCode
  ) {
    initDataV2.dpaTransactionOptions.transactionAmount = {
      transactionAmount: `${initDataV1.paymentRequest.subtotal}`,
      transactionCurrencyCode: initDataV1.paymentRequest.currencyCode || "USD",
    };
  }

  if (initDataV1.settings?.billingCountries) {
    initDataV2.dpaTransactionOptions.dpaAcceptedBillingCountries =
      initDataV1.settings.billingCountries;
  }

  if (initDataV1.settings?.countryCode) {
    initDataV2.dpaTransactionOptions.merchantCountryCode =
      initDataV1.settings.countryCode;
  }

  if (initDataV1.paymentRequest?.orderId) {
    initDataV2.dpaTransactionOptions.merchantOrderId =
      initDataV1.paymentRequest.orderId;
  }

  return initDataV2;
};

let v1Callbacks = {
  success: null,
  error: null,
  canceled: null,
};

export const v2Configurations = {
  apikey: null,
  initParams: null,
};

export const checkoutParams = {};

const hasRequiredParams = (v1Config) => {
  const requiredParams = [
    "apikey",
    "acquirerBIN",
    "acquirerMerchantId",
    "merchantName",
  ];

  let hasRequiredData = true;
  for (let param of requiredParams) {
    if (!v1Config?.[param]) {
      console.error("Missing required init parameter:", param);
      hasRequiredData = false;
    }
  }

  return hasRequiredData;
};

const v1CheckoutFuctions = {
  init: (initConfig) => {
    const v1Config = initConfig;
    if (!hasRequiredParams(v1Config)) return;
    checkoutParams.acquirerBIN = v1Config.acquirerBIN;
    checkoutParams.acquirerMerchantId = v1Config.acquirerMerchantId;
    checkoutParams.merchantName = v1Config.merchantName;
    const cardBrands = initConfig?.settings?.payment?.cardBrands;

    v2Configurations.initParams = buildV2InitializeConfig(v1Config);
    initCheckoutButton(cardBrands);
    v2Configurations.apikey = v1Config.apikey;
  },

  additionalCheckoutParameters: (params) => {
    console.log(params);
  },

  on: (eventName, callback) => {
    switch (eventName) {
      case "payment.success":
        v1Callbacks.success = callback;
        break;
      case "payment.cancel":
        v1Callbacks.error = callback;
        break;
      case "payment.error":
        v1Callbacks.canceled = callback;
        break;
      default:
        console.log("Unknown event name:", eventName);
        break;
    }
  },
};

window.V = v1CheckoutFuctions;

if (typeof window.onVisaCheckoutReady === "function") {
  console.log("onVisaCheckoutReady is called");
  window.onVisaCheckoutReady();
} else {
  console.log("onVisaCheckoutReady is not defined");
}

console.log("migration script loaded");
