import { useContext } from "react";
import { ViewContext } from "../context";
import { VIEWS } from "../constants/enums";
import {
  checkoutParams,
  v1Callbacks,
  v1Config,
  v2Configurations,
} from "../../migration";
import { convertResponse } from "../api";

const useVisaCheckout = () => {
  const Vsb = window?.VSDK;
  const isVsbReady = typeof Vsb != "undefined";
  const {
    setView,
    setCards,
    setMaskedValidationChannel,
    selectedCard,
    consumerEmail,
    setConsumerEmail,
  } = useContext(ViewContext);

  const init = async () => {
    if (!isVsbReady) {
      console.warn("VSDK not found");
      return;
    }
    console.log(v2Configurations.initParams);
    await Vsb.initialize({
      dpaTransactionOptions: {
        dpaLocale: "en_US",
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
  };

  const getCards = async (email = "", otp = null) => {
    let userEmail = email || consumerEmail;
    if (!userEmail) {
      setView(VIEWS.EMAIL);
      console.log("taking user email input");
      return;
    }
    console.log("Fetching cards...", otp);
    const consumerIdentity = {
      identityProvider: "SRC",
      identityValue: userEmail,
      identityType: "EMAIL_ADDRESS",
    };

    const payload = {
      consumerIdentity,
    };

    if (otp) payload.validationData = otp;

    try {
      const cards = await Vsb.getCards(payload);
      const { actionCode } = cards;
      console.log("===> actionCode", cards);

      switch (actionCode) {
        case "SUCCESS":
          console.log("SUCCESS", cards);
          setView(VIEWS.SELECT_CARD);
          setCards(cards);
          return;
        case "ERROR":
          console.log("ERROR");
          close();
          break;
        case "PENDING_CONSUMER_IDV":
          console.log("taking OTP input");
          localStorage.setItem("consumerEmail", userEmail);
          setConsumerEmail(userEmail);
          setMaskedValidationChannel(cards?.maskedValidationChannel);
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

  const checkout = async (iframeRef) => {
    try {
      console.log("Processing checkout...", iframeRef);
      const checkoutParameters = {
        srcDigitalCardId: selectedCard?.srcDigitalCardId || "",
        payloadTypeIndicatorCheckout: "FULL",
        // windowRef: iframeRef,
        dpaTransactionOptions: {
          authenticationPreferences: {
            authenticationMethods: [
              {
                authenticationMethodType: "3DS",
                authenticationSubject: "CARDHOLDER",
                methodAttributes: {
                  challengeIndicator: "01",
                },
              },
            ],
            payloadRequested: "AUTHENTICATED",
          },
          acquirerBIN: checkoutParams?.acquirerBIN,
          acquirerMerchantId: checkoutParams?.acquirerMerchantId,
          merchantName: checkoutParams?.merchantName,
          merchantOrderId: "fd65f14b-8155-47f0-bfa9-65ff9df0f760",
        },
      };
      const checkoutResponse = await Vsb.checkout(checkoutParameters);
      console.log("===> My Response", checkoutResponse);
      let { actionCode } = checkoutResponse;
      if (actionCode === "SUCCESS") {
        let res = await convertResponse({
          ...checkoutResponse,
          paymentRequest: v1Config,
        });
        if (!res.error) {
          v1Callbacks.success(res);
        }
      }
      document.body.removeChild(document.getElementById("sdkOverlay"));
    } catch (e) {
      v1Callbacks.error(e);
    }
  };

  const close = () => {
    console.log("close called");
    document.body.removeChild(document.getElementById("sdkOverlay"));
    v1Callbacks.canceled();
  };

  return {
    init,
    getCards,
    checkout,
    close,
  };
};

export default useVisaCheckout;
