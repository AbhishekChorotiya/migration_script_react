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
      const iframeDiv = createOverlay();
      iframeDiv.appendChild(visaCheckoutElement);
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

export const v1Callbacks = {
  success: null,
  error: null,
  canceled: null,
};

export const v2Configurations = {
  apikey: null,
  initParams: null,
};

export const checkoutParams = {
  merchantName: null,
  acquirerBIN: null,
  acquirerMerchantId: null,
};

const loadVisaV2SDK = (dpaId) => {
  const sdkUrl = `https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/integration/v2/sdk.js?dpaId=${dpaId}&locale=en_US&cardBrands=visa,mastercard&dpaClientId=TestMerchant`;
  const pazeSdkUrl =
    "https://sandbox.digitalwallet.earlywarning.com/web/resources/js/digitalwallet-sdk.js";
  const script = document.createElement("script");
  const pazeScript = document.createElement("script");
  script.src = sdkUrl;
  pazeScript.src = pazeSdkUrl;
  script.onload = () => {
    console.log("[Bridge] Visa v2 SDK loaded successfully.");
  };
  pazeScript.onload = () => {
    console.log("Paze SDK loaded successfully.");
  };
  script.onerror = () => {
    console.error("[Bridge] Failed to load Visa v2 SDK.");
  };
  pazeScript.onerror = () => {
    console.error("Failed to load Paze SDK.");
  };
  document.body.appendChild(script);
  document.body.appendChild(pazeScript);
};

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
    v2Configurations.apikey = v1Config.apikey;
    v2Configurations.initParams = buildV2InitializeConfig(v1Config);
    loadVisaV2SDK(v1Config.apikey);
    initCheckoutButton(cardBrands);
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

function createIframeDialog(overlayDiv) {
  const iframeDiv = document.createElement("div");
  iframeDiv.style.width = "100%";
  iframeDiv.style.maxWidth = "400px";
  iframeDiv.style.height = "500px";
  iframeDiv.style.border = "none";
  iframeDiv.style.margin = "0";
  iframeDiv.style.padding = "0";
  iframeDiv.style.zIndex = "9999";
  iframeDiv.style.backgroundColor = "white";
  iframeDiv.id = "iframeDiv";
  overlayDiv.appendChild(iframeDiv);
  iframeDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  return iframeDiv;
}

export const createOverlay = () => {
  const overlayDiv = document.createElement("div");
  overlayDiv.id = "sdkOverlay";
  overlayDiv.style.position = "fixed";
  overlayDiv.style.display = "flex";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
  overlayDiv.style.justifyContent = "center";
  overlayDiv.style.alignItems = "center";
  overlayDiv.style.zIndex = "999";
  document.body.appendChild(overlayDiv);
  overlayDiv.addEventListener("click", () => {
    document.body.removeChild(overlayDiv);
    v1Callbacks.canceled();
  });
  const iframeDiv = createIframeDialog(overlayDiv);
  return iframeDiv;
};

if (typeof window.onVisaCheckoutReady === "function") {
  console.log("onVisaCheckoutReady is called");
  window.onVisaCheckoutReady();
} else {
  console.log("onVisaCheckoutReady is not defined");
}

console.log("migration script loaded");
