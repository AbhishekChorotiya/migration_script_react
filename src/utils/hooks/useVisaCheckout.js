import { useSetAtom, useAtomValue } from "jotai";
import { VIEWS } from "../constants/enums";
import { useAtom } from "jotai";
import {
  viewAtom,
  cardsAtom,
  selectedCardAtom,
  consumerEmailAtom,
  maskedValidationChannelAtom,
} from "../atoms";
import { checkoutParams, v1Callbacks, v2Configurations } from "../../migration";

const useVisaCheckout = () => {
  const Vsb = window?.VSDK;
  const isVsbReady = typeof Vsb != "undefined";
  const setView = useSetAtom(viewAtom);
  const setCards = useSetAtom(cardsAtom);
  const setMaskedValidationChannel = useSetAtom(maskedValidationChannelAtom);
  const selectedCard = useAtomValue(selectedCardAtom);
  const [consumerEmail, setConsumerEmail] = useAtom(consumerEmailAtom);

  const init = async () => {
    if (!isVsbReady) {
      console.warn("VSDK not found");
      return;
    }
    await Vsb.initialize(v2Configurations.initParams);
  };

  const getCards = async (email = "", otp = null) => {
    let userEmail = email || consumerEmail;
    console.log("Fetching cards...", otp);

    const consumerIdentity = userEmail
      ? {
          identityProvider: "SRC",
          identityValue: userEmail,
          identityType: "EMAIL_ADDRESS",
        }
      : {};

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
          switch (cards?.error?.reason) {
            case "INVALID_PARAMETER":
              setView(VIEWS.EMAIL);
              break;
            default:
              console.log("ERROR");
              close();
          }
          break;
        case "PENDING_CONSUMER_IDV":
          console.log("taking OTP input");
          localStorage.setItem("consumerEmail", userEmail);
          setConsumerEmail(userEmail);
          setMaskedValidationChannel(cards?.maskedValidationChannel);
          setView(VIEWS.OTP);
          return;
        default:
          console.log("ERROR");
          close();
      }
    } catch (e) {
      console.error(e);
      close();
    }
  };

  const checkout = async (iframeRef) => {
    try {
      console.log("Processing checkout...", iframeRef);
      const checkoutParameters = {
        srcDigitalCardId: selectedCard?.srcDigitalCardId || "",
        payloadTypeIndicatorCheckout: "FULL",
        windowRef: iframeRef,
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
        },
      };
      const checkoutResponse = await Vsb.checkout(checkoutParameters);
      console.log("===> My Response", checkoutResponse);
      v1Callbacks.success(checkoutResponse);
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
