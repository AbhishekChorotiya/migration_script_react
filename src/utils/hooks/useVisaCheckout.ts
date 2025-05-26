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
import * as React from "react";
import { SelectedCard } from "../atoms";

declare global {
  interface Window {
    VSDK?: any;
  }
}

interface ConsumerIdentity {
  identityProvider: string;
  identityValue: string;
  identityType: string;
}

interface GetCardsResponse {
  actionCode: string;
  error?: {
    reason: string;
  };
  maskedValidationChannel?: string;
  profiles?: SelectedCard[]; // Made profiles optional as it might not always be present on error
  // Add other properties from the cards object if known
}

interface CheckoutParameters {
  srcDigitalCardId: string;
  payloadTypeIndicatorCheckout: string;
  windowRef: React.RefObject<HTMLIFrameElement>;
  dpaTransactionOptions: {
    authenticationPreferences: {
      authenticationMethods: {
        authenticationMethodType: string;
        authenticationSubject: string;
        methodAttributes: {
          challengeIndicator: string;
        };
      }[];
      payloadRequested: string;
    };
    acquirerBIN: string;
    acquirerMerchantId: string;
    merchantName: string;
  };
}

interface CheckoutResponse {
  [key: string]: any;
}

interface GetCardsPayload {
  consumerIdentity: ConsumerIdentity;
  validationData?: string | null;
}

interface V1Callbacks {
  success: ((response: CheckoutResponse) => void) | null;
  error: ((e: any) => void) | null;
  canceled: (() => void) | null;
}

interface CheckoutParams {
  acquirerBIN: string | null;
  acquirerMerchantId: string | null;
  merchantName: string | null;
}

const useVisaCheckout = () => {
  const VSDK = window?.VSDK;
  const isVSDKReady: boolean = typeof VSDK !== "undefined";
  const setView = useSetAtom(viewAtom);
  const setCards = useSetAtom(cardsAtom); // Removed explicit type and as any
  const setMaskedValidationChannel = useSetAtom(maskedValidationChannelAtom);
  const selectedCard = useAtomValue(selectedCardAtom); // Removed as SelectedCard | null
  const [consumerEmail, setConsumerEmail] = useAtom(consumerEmailAtom);

  const typedV1Callbacks: V1Callbacks = v1Callbacks;
  const typedCheckoutParams: CheckoutParams = checkoutParams;

  const init = async (): Promise<void> => {
    if (!isVSDKReady) {
      console.warn("Visa SDK (VSDK) not found or not ready.");
      return;
    }
    await VSDK.initialize(v2Configurations.initParams);
  };

  const getCards = async (email: string = "", otp: string | null = null): Promise<void> => {
    let userEmail: string = email || consumerEmail;
    userEmail = userEmail.replace(/^"|"$/g, "");
    if (!userEmail) {
      console.warn("Email is required to fetch cards.");
      setView(VIEWS.EMAIL);
      return;
    }
    console.log("Fetching cards...", otp);

    const consumerIdentity: ConsumerIdentity = userEmail
      ? {
        identityProvider: "SRC",
        identityValue: userEmail,
        identityType: "EMAIL_ADDRESS",
      }
      : ({} as ConsumerIdentity);

    const payload: GetCardsPayload = {
      consumerIdentity,
    };

    if (otp) payload.validationData = otp;

    try {
      const cards: GetCardsResponse = await VSDK.getCards(payload);
      const { actionCode } = cards;
      console.log("===> actionCode", cards);

      switch (actionCode) {
        case "SUCCESS":
          console.log("SUCCESS", cards);
          setView(VIEWS.SELECT_CARD);
          setCards({ profiles: cards.profiles || [] });
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
          setMaskedValidationChannel(cards?.maskedValidationChannel ?? "");
          setView(VIEWS.OTP);
          return;
        default:
          console.log("ERROR");
          close();
      }
    } catch (e: any) {
      console.error(e);
      close();
    }
  };

  const checkout = async (iframeRef: React.RefObject<HTMLIFrameElement>): Promise<void> => {
    try {
      console.log("Processing checkout...", iframeRef);
      const checkoutParameters: CheckoutParameters = {
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
          acquirerBIN: typedCheckoutParams?.acquirerBIN || "",
          acquirerMerchantId: typedCheckoutParams?.acquirerMerchantId || "",
          merchantName: typedCheckoutParams?.merchantName || "",
        },
      };
      const checkoutResponse: CheckoutResponse = await VSDK.checkout(checkoutParameters);
      console.log("===> My Response", checkoutResponse);
      typedV1Callbacks.success?.(checkoutResponse);
      const sdkOverlay = document.getElementById("sdkOverlay");
      if (sdkOverlay) {
        document.body.removeChild(sdkOverlay);
      }
    } catch (e: any) {
      typedV1Callbacks.error?.(e);
    }
  };

  const close = (): void => {
    console.log("close called");
    const sdkOverlay = document.getElementById("sdkOverlay");
    if (sdkOverlay) {
      document.body.removeChild(sdkOverlay);
    }
    typedV1Callbacks.canceled?.();
  };

  return {
    init,
    getCards,
    checkout,
    close,
  };
};

export default useVisaCheckout;
