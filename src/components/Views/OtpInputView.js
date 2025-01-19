import React, { useContext, useState } from "react";
import Button from "../common/Button";
import { ViewContext } from "../../utils/context";
import Input from "../common/Input";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";

const OtpInputView = () => {
  const { maskedValidationChannel } = useContext(ViewContext);
  const { getCards } = useVisaCheckout();
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(true);
  if (!maskedValidationChannel) {
    return <div>Something went wrong!</div>;
  }

  const handleSubmit = () => {
    if (!otp || otp.length !== 6) {
      setIsValidOtp(false);
      return;
    }
    setIsValidOtp(true);
    getCards(null, otp);
  };

  return (
    <div className="p-5 flex flex-col">
      <h1 className="text-center">Welcome back</h1>
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
        setValue={(e) => setOtp(e.replace(/\D/g, ""))}
        maxLength={6}
        value={otp}
        submitFunction={handleSubmit}
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
      <Button title="CONTINUE" onClick={handleSubmit} />
    </div>
  );
};

export default OtpInputView;
