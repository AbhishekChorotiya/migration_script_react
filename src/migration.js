import { pazeCheckout } from "./paze";

export let newUI = false;

const VISA_CHECKOUT_BUTTON_BASE_URL =
  "https://sandbox-assets.secure.checkout.visa.com/wallet-services-web/xo/button.png?cardBrands=VISA%2CMASTERCARD%2CDISCOVER%2CAMEX&animation=true&legacy=false&svg=true";
const VISA_V2_SDK_BASE_URL =
  "https://sandbox.secure.checkout.visa.com/checkout-widget/resources/js/integration/v2/sdk.js";
const VISA_CHECKOUT_ELEMENT_ID = "visaCheckout";
const CTP_BUTTON_ID = "ctp-button";
const V1_BUTTON_CLASS = "v-button";
const SDK_OVERLAY_ID = "sdkOverlay";
const IFRAME_DIV_ID = "iframeDiv";

const initCheckoutButton = (cardBrands) => {
  let queryString = cardBrands?.length
    ? `&orderedCardBrands=${cardBrands.join(",")}`
    : "&orderedCardBrands=ALL";

  let imageUrl = `${VISA_CHECKOUT_BUTTON_BASE_URL}${queryString}`;

  function clickHandler() {
    let visaCheckoutElement = document.getElementById(VISA_CHECKOUT_ELEMENT_ID);
    if (visaCheckoutElement) {
      console.log("Visa checkout element already exists");
      return;
    }
    visaCheckoutElement = document.createElement("visa-checkout");
    visaCheckoutElement.setAttribute("id", VISA_CHECKOUT_ELEMENT_ID);
    const iframeDiv = createOverlay();
    iframeDiv.appendChild(visaCheckoutElement);
  }

  document.addEventListener("click", function (event) {
    if (event.target) {
      if (event.target.id === CTP_BUTTON_ID) {
        console.log("CTP button clicked");
        clickHandler();
      } else if (event.target.classList.contains(V1_BUTTON_CLASS)) {
        console.log("V1 button clicked via event delegation");
        clickHandler();
      }
    }
  });

  // Function to update the v1Button's src
  const updateV1ButtonSrc = () => {
    const v1Button = document.querySelector(`.${V1_BUTTON_CLASS}`);
    if (v1Button && v1Button.src !== imageUrl) {
      v1Button.src = imageUrl;
      console.log("V1 button src updated:", imageUrl);
    }
  };

  // Initial check in case the button is already in the DOM
  updateV1ButtonSrc();

  // Observe for changes in the DOM to update the src if the button is added later
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === 1 && node.classList.contains(V1_BUTTON_CLASS)) {
            updateV1ButtonSrc();
            // If the button is found and updated, we can disconnect the observer
            // if we only expect one v1Button to appear.
            // If multiple v1Buttons can appear dynamically, keep observing.
            // For now, assuming one main v1Button.
            // observer.disconnect();
            return;
          }
        }
      }
    }
  });

  // Start observing the document body for configured mutations
  observer.observe(document.body, { childList: true, subtree: true });
};

const buildV2InitializeConfig = (initDataV1) => {
  const initDataV2 = {
    dpaTransactionOptions: {
      dpaLocale: initDataV1.settings?.locale || "en_US",
      paymentOptions: [
        {
          dpaDynamicDataTtlMinutes: 15,
          dynamicDataType: "CARD_APPLICATION_CRYPTOGRAM_LONG_FORM",
        },
      ],
      merchantCountryCode: initDataV1.settings?.countryCode || "US",
      merchantOrderId:
        initDataV1.paymentRequest?.orderId || "Merchant defined order ID",
    },
  };

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

  console.log("initDataV2", initDataV2);
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

const createScriptElement = (src, onload, onerror) => {
  const script = document.createElement("script");
  script.src = src;
  script.onload = onload;
  script.onerror = onerror;
  return script;
};

const createLinkElement = (rel, href, crossOrigin = null) => {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (crossOrigin) {
    link.crossOrigin = crossOrigin;
  }
  return link;
};

const loadGoogleFonts = () => {
  const preconnect1 = createLinkElement(
    "preconnect",
    "https://fonts.googleapis.com"
  );
  const preconnect2 = createLinkElement(
    "preconnect",
    "https://fonts.gstatic.com",
    "anonymous"
  );
  const fontLink = createLinkElement(
    "stylesheet",
    "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
  );

  document.head.appendChild(preconnect1);
  document.head.appendChild(preconnect2);
  document.head.appendChild(fontLink);
};

const loadVisaV2SDK = (v1Config) => {
  const sdkUrl = `${VISA_V2_SDK_BASE_URL}?dpaId=${v1Config.apikey}&locale=en_US&cardBrands=visa,mastercard&dpaClientId=TestMerchant`;
  const script = createScriptElement(
    sdkUrl,
    () => {
      console.log("[Bridge] Visa v2 SDK loaded successfully.");
      loadGoogleFonts();
    },
    () => {
      console.error("[Bridge] Failed to load Visa v2 SDK.");
    }
  );
  document.body.appendChild(script);
};

const hasRequiredParams = (v1Config) => {
  const requiredParams = [
    "apikey",
    "acquirerBIN",
    "acquirerMerchantId",
    "merchantName",
  ];

  const missingParams = requiredParams.filter((param) => !v1Config?.[param]);

  if (missingParams.length > 0) {
    missingParams.forEach((param) =>
      console.error("Missing required init parameter:", param)
    );
    return false;
  }

  return true;
};

export let v1Config = null;

const v1CheckoutFuctions = {
  init: (initConfig) => {
    v1Config = initConfig;
    if (initConfig?.newUI) {
      newUI = true;
    }
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

const IFRAME_DIALOG_STYLES = {
  width: "100%",
  maxWidth: "400px",
  height: "500px",
  border: "none",
  margin: "0",
  padding: "0",
  zIndex: "9999",
  backgroundColor: "white",
};

const OVERLAY_STYLES = {
  position: "fixed",
  display: "flex",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "999",
};

function applyStyles(element, styles) {
  for (const key in styles) {
    element.style[key] = styles[key];
  }
}

function createIframeDialog(overlayDiv) {
  const iframeDiv = document.createElement("div");
  applyStyles(iframeDiv, IFRAME_DIALOG_STYLES);
  iframeDiv.id = IFRAME_DIV_ID;
  overlayDiv.appendChild(iframeDiv);
  iframeDiv.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });
  return iframeDiv;
}

export const createOverlay = () => {
  const overlayDiv = document.createElement("div");
  overlayDiv.id = SDK_OVERLAY_ID;
  applyStyles(overlayDiv, OVERLAY_STYLES);
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
