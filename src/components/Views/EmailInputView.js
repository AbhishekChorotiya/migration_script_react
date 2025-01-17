import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";

const EmailInputView = () => {
  const [email, setEmail] = useState("");
  const { getCards } = useVisaCheckout();
  return (
    <div className="p-5 flex flex-col">
      <div className="w-full border-b border-black py-4 flex flex-col gap-2">
        <h1 className="text-2xl text-center">Easy and smart online checkout</h1>
        <p className="text-center">Pay with confidence with Click to Pay</p>
      </div>
      <Input placeholder="Email Address" />
      <p className="my-3 mb-1 text-sm">
        By continuing, you agree to Visa's{" "}
        <a href="#" className="underline text-blue-700">
          Privacy Notice.
        </a>
      </p>
      <Button title="CONTINUE" />
    </div>
  );
};

export default EmailInputView;
