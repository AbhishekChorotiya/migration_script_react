import { pazeCheckout } from "./paze";

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
  const initDataV2 = {
    dpaTransactionOptions: {
      payloadTypeIndicator: "FULL",
      acquirerBIN: initDataV1?.acquirerBIN || "455555",
      acquirerMerchantId: initDataV1?.acquirerMerchantId || "12345678",
      merchantCategoryCode: initDataV1?.merchantCategoryCode || "4829",
      // paymentOptions: [
      //   {
      //     dpaDynamicDataTtlMinutes: 15,
      //     dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM",
      //     dpaPanRequested: true,
      //   },
      // ],
      consumerNameRequested: true,
      consumerEmailAddressRequested: true,
      consumerPhoneNumberRequested: true,
    },
  };

  initDataV2.dpaTransactionOptions.dpaLocale =
    initDataV1.settings.locale || "en_US";

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

  initDataV2.dpaTransactionOptions.merchantOrderId =
    initDataV1.paymentRequest.orderId || "fd65f14b-8155-47f0-bfa9-65ff9df0f760";

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

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const checkForPartnerScripts = async () => {
  const maxAttempts = 8;
  let attempts = 0;
  let visaFound = false;
  let mastercardFound = false;

  while (attempts < maxAttempts && (!visaFound || !mastercardFound)) {
    const scripts = Array.from(document.getElementsByTagName("script"));
    for (const script of scripts) {
      const id = script.id.toLowerCase();
      const src = script.src.toLowerCase();

      if (
        !visaFound &&
        (id.includes("visasdk") ||
          src.includes("/resources/js/src-i-adapter/visasdk.js"))
      ) {
        visaFound = true;
      }
      if (
        !mastercardFound &&
        (id.includes("mastercardsdk") ||
          src.includes("mastercard.com/sdk/srcsdk.mastercard.js"))
      ) {
        mastercardFound = true;
      }
      if (visaFound && mastercardFound) break;
    }

    if (visaFound && mastercardFound) break;

    console.log("Visa or Mastercard SDKs not found yet.");
    attempts++;
    await delay(1000);
  }

  if (!visaFound || !mastercardFound) {
    console.log("Timeout reached, no Visa or Mastercard SDKs found.");
    return;
  }

  console.log("Both Visa and Mastercard SDKs found.");

  const Vsb = window?.VSDK;
  if (!Vsb) {
    console.error("VSDK is not available on the window.");
    return;
  }

  const maxCardAttempts = 6;
  let cardAttempts = 0;
  let cards;

  while (cardAttempts < maxCardAttempts) {
    await Vsb.initialize({
      dpaTransactionOptions: {
        dpaLocale: "en_US",
        consumerNameRequested: true,
        consumerEmailAddressRequested: true,
        consumerPhoneNumberRequested: true,
        transactionAmount: {
          transactionAmount: "123.94",
          transactionCurrencyCode: "USD",
        },
        payloadTypeIndicator: "FULL",
        acquirerBIN: "455555",
        acquirerMerchantId: "12345678",
        merchantCategoryCode: "4829",
        merchantCountryCode: "US",
        dpaBillingPreference: "FULL",
        dpaShippingPreference: "FULL",
      },
    });
    cards = await Vsb.getCards({
      consumerIdentity: {
        identityProvider: "SRC",
        identityValue: "abhishek.c@juspay.in",
        identityType: "EMAIL_ADDRESS",
      },
    });

    if (cards?.actionCode) break;

    cardAttempts++;
    console.log("RETRYING ---> ", cardAttempts, cards);
    await delay(2000);
  }

  if (!cards?.actionCode) {
    console.log("Maximum retries attempted for getCards.");
  } else {
    console.log("<====SCRIPT IS WORKING FINE====>", cards);
  }
};

const loadVisaV2SDK = (v1Config) => {
  const sdkUrl = `https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/integration/v2/sdk.js?dpaId=498WCF39JVQVH1UK4TGG21leLAj_MJQoapP5f12IanfEYaSno&locale=en_US&cardBrands=visa,mastercard&dpaClientId=TestMerchant`;
  const script = document.createElement("script");
  script.src = sdkUrl;
  script.onload = () => {
    console.log("[Bridge] Visa v2 SDK loaded successfully.");
    checkForPartnerScripts();
  };
  script.onerror = () => {
    console.error("[Bridge] Failed to load Visa v2 SDK.");
  };
  document.body.appendChild(script);
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

export var v1Config = null;

const v1CheckoutFuctions = {
  init: (initConfig) => {
    v1Config = initConfig;
    if (!hasRequiredParams(v1Config)) return;
    checkoutParams.acquirerBIN = v1Config.acquirerBIN;
    checkoutParams.acquirerMerchantId = v1Config.acquirerMerchantId;
    checkoutParams.merchantName = v1Config.merchantName;
    const cardBrands = initConfig?.settings?.payment?.cardBrands;
    v2Configurations.apikey = v1Config.apikey;
    v2Configurations.initParams = buildV2InitializeConfig(v1Config);
    loadVisaV2SDK(v1Config);
    initCheckoutButton(cardBrands);
  },

  additionalCheckoutParameters: (params) => {
    console.log(params);
  },

  initPaze: (params) => {
    console.log("paze init params: ", params);
    pazeCheckout(params, v1Config);
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
