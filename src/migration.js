import { buildV2InitializeConfig, initCheckoutButton } from "./utils/helpers";

console.log("migration script loaded");

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
