import React from "react";
import Button from "../common/Button";

const OtpInputView = () => {
  return (
    <div className="p-5 flex flex-col">
      <h1 className="text-center">Welcome back</h1>
      <div className="flex flex-col items-center border-b border-black py-4">
        <p>Enter the one-time code Mastercard texted to</p>
        <p>+91 8003132368</p>
        <p>
          (
          <button type="button" className="underline text-blue-700">
            Not you?
          </button>
          )
        </p>
      </div>
      <input
        placeholder="One-time code"
        className="w-full border-b-2 border-yellow-400 mt-2 py-2"
      />
      <div className="flex justify-end">
        <button type="button" className="underline my-3 text-blue-700">
          Resend code
        </button>
      </div>
      <Button />
    </div>
  );
};

export default OtpInputView;
