const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//need to store this on DB
const callIdMap = {};

function decryptJWT(token) {
  const decodedNoVerify = jwt.decode(token);
  let v2Res = decodedNoVerify;
  const config = {
    paths: [
      {
        path: "/resource1",
        toEncrypt: [],
        toDecrypt: [
          {
            element: "$",
            obj: "$",
          },
        ],
      },
    ],
    mode: "JWE",
    encryptedValueFieldName: "encryptedPayload",
    encryptionCertificate: "./visaCerts/decryption_cert.pem",
    keyStore: "./visaCerts/visa_decryption.pem",
  };

  const response = {};
  response.request = { url: "/resource1" };
  response.body = {
    encryptedPayload: decodedNoVerify.encryptedPayload,
  };

  const jwe = new (require("mastercard-client-encryption").JweEncryption)(
    config
  );

  let responsePayload = jwe.decrypt(response);

  v2Res.decryptedPayload = responsePayload;
  console.log(JSON.stringify(v2Res, null, 2));
  return v2Res;
}

function convertV2toV1(v2, paymentRequest) {
  const payload = {
    paymentRequest,
    userData: {
      userFirstName: v2?.decryptedPayload?.card?.cardholderFirstName,
      userLastName: v2?.decryptedPayload?.card?.cardholderLastName,
      userFullName: v2?.decryptedPayload?.card?.cardholderFullName,
      userEmail: v2?.decryptedPayload?.consumerEmailAddress || "",
    },
    paymentInstrument: {
      token: v2?.decryptedPayload?.token?.paymentToken
        ? v2?.decryptedPayload?.token
        : null,
      lastFourDigits: v2?.maskedCard?.panLastFour,
      binSixDigits: v2?.maskedCard?.panBin,
      accountNumber: v2?.decryptedPayload?.card?.primaryAccountNumber,
      dynamicData: v2?.decryptedPayload?.dynamicData,
      paymentAccountReference:
        v2?.decryptedPayload?.card?.paymentAccountReference,
      paymentType: {
        cardBrand:
          v2?.maskedCard?.paymentCardDescriptor === "mastercard"
            ? "MASTERCARD"
            : "VISA",
        cardType: v2?.maskedCard?.paymentCardType.toUpperCase(),
      },
      billingAddress: {
        line1:
          v2?.decryptedPayload?.billingAddress?.line1 ||
          v2?.maskedCard?.maskedBillingAddress?.line1,
        city:
          v2?.decryptedPayload?.billingAddress?.city ||
          v2?.maskedCard?.maskedBillingAddress?.city,
        stateProvinceCode:
          v2?.decryptedPayload?.billingAddress?.state ||
          v2?.maskedCard?.maskedBillingAddress?.state,
        postalCode:
          v2?.decryptedPayload?.billingAddress?.zip ||
          v2?.maskedCard?.maskedBillingAddress?.zip,
        countryCode:
          v2?.decryptedPayload?.billingAddress?.countryCode ||
          v2?.maskedCard?.maskedBillingAddress?.countryCode,
      },
      cardArts: {
        cardArt: [
          {
            baseImageFileName: v2?.maskedCard?.digitalCardData?.artUri,
            height: parseInt(v2?.maskedCard?.digitalCardData?.artHeight, 10),
            width: parseInt(v2?.maskedCard?.digitalCardData?.artWidth, 10),
          },
        ],
      },
    },
  };
  payload.checkoutResponse = v2;
  delete payload.checkoutResponse.encryptedPayload;
  return payload;
}

app.post("/convert-response", (req, res) => {
  try {
    let { checkoutResponse, paymentRequest } = req.body;
    let decrypted = decryptJWT(checkoutResponse);
    let converted = convertV2toV1(decrypted, paymentRequest);
    res.json(converted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/checkout", (req, res) => {
  console.log("request->", req.body);
  const data = req.body;
  if (data?.actionCode === "SUCCESS" && data?.checkoutResponse) {
    const callid = Math.floor(Math.random() * 10000000000).toString();
    callIdMap[callid] = data;
    res.json({
      callid,
      paymentMethodType: "PAN",
      partialShippingAddress: {
        countryCode: "US",
        postalCode: "90056",
      },
      idToken: "",
      unbindAppInstance: data?.bindingStatus === "BIND" ? false : true,
      dcfActionCode: "COMPLETE",
      vInitRequest: req?.body?.paymentRequest,
    });
  } else {
    req.statusCode(400).json({ error: "Invalid action code" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
