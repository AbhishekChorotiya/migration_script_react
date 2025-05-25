import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import { useAtom } from "jotai";
import { maskedValidationChannelAtom, viewAtom } from "../../utils/atoms";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";
import C2pLogo from "../icons/C2pLogo";
import VisaLogo from "../icons/VisaLogo";
import MasterCardLogo from "../icons/MasterCardLogo";
import OtpInput from "../common/OtpInput";
import { newUI } from "../../migration";
import { VIEWS } from "../../utils/constants/enums";

const OtpInputView = () => {
  const [maskedValidationChannel] = useAtom(maskedValidationChannelAtom);
  const [, setView] = useAtom(viewAtom);
  const { getCards } = useVisaCheckout();
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(true);
  if (!maskedValidationChannel) {
    return <div>Something went wrong!</div>;
  }
  const UiType = newUI ? "NEW" : "OLD";
  const handleSubmit = async () => {
    console.log(otp);
    if (!otp || otp.length !== 6) {
      setIsValidOtp(false);
      return;
    }
    setIsValidOtp(true);
    setView(VIEWS.LOADING);
    await getCards(null, otp);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  if (UiType === "OLD") {
    return (
      <div className="p-5 flex flex-col">
        <h1 className="text-center text-2xl">Welcome back</h1>
        <div className="flex flex-col items-center border-b border-black py-4">
          <p>Enter the one-time code Mastercard texted to</p>
          {maskedValidationChannel.split(",").map((channel, i) => (
            <p key={i} className="font-semibold">
              {channel}
            </p>
          ))}
          <p>
            (
            <button
              onClick={() => console.log("Not you? Clicked!")}
              type="button"
              className="underline text-blue-700"
            >
              Not you?
            </button>
            )
          </p>
        </div>
        <Input
          type="number"
          autoFocus
          placeholder="One-time code"
          setValue={(value) => setOtp(value.replace(/\D/g, ""))}
          maxLength={6}
          value={otp}
          submitFunction={handleSubmit}
          disabled={false}
        />
        {!isValidOtp && (
          <p className="text-red-600 mt-1 text-sm">OTP is not valid</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={() => console.log("Resend code clicked!")}
            type="button"
            className="underline my-3 text-blue-700"
          >
            Resend code
          </button>
        </div>
        <Button loading={false} title="CONTINUE" onClick={handleSubmit} />
      </div>
    );
  } else {
    return (
      <div className="p-5 flex flex-col">
        <h1 className="text-center text-lg">
          Click to pay has found your linked cards
        </h1>
        <div className="flex text-center flex-col text-sm items-center py-2">
          <p>
            To access the cards, enter the code <br></br> sent to{" "}
          </p>
          {maskedValidationChannel.split(",").map((channel, i) => (
            <p key={i} className="font-semibold">
              {channel}
            </p>
          ))}
        </div>

        <div className="w-full h-fit mt-2 flex items-center justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span className="w-4" />}
            inputStyle={"w-10 h-10 border-2 rounded font-semibold"}
            onKeyDown={handleKeyDown}
          />
        </div>
        {!isValidOtp && (
          <p className="text-red-600 ml-5 mt-2 text-sm">OTP is not valid</p>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => console.log("Resend code clicked!")}
            type="button"
            className="underline my-3 text-blue-700"
          >
            Resend code
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={false}
          style={{ backgroundColor: "#005C78" }}
          className="w-full disabled:bg-gray-300 rounded mt-5 flex items-center justify-center gap-2 h-12 text-white"
        >
          Verify and continue
        </button>
        <div className="h-10 w-full my-2 flex justify-center items-center">
          <div className="flex h-7 w-7">
            <C2pLogo />
          </div>
          <div className="w-0.5 mx-2 h-7 border-r border-black" />
          <div className="flex h-7 w-8">
            <VisaLogo />
          </div>
          <div className="flex h-7 flex items-center justify-center mx-2 w-7">
            <MasterCardLogo />
          </div>
        </div>
        <div className="text-center w-full text-sm">
          <p>To access different set of linked cards</p>
          <button className="underline font-semibold text-blue-700 mt-2">
            Switch ID
          </button>
        </div>
      </div>
    );
  }
};

export default OtpInputView;
