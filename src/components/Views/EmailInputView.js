import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";
import { validateEmail } from "../../utils/helpers";

const EmailInputView = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("consumerEmail") || ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { getCards } = useVisaCheckout();
  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    setSubmitting(true);
    await getCards(email);
    setIsValidEmail(true);
    setSubmitting(false);
  };
  return (
    <div className="p-5 flex h-full flex-col">
      <div className="w-full border-b border-black py-4 flex flex-col gap-2">
        <h1 className="text-2xl text-center">Easy and smart online checkout</h1>
        <p className="text-center">Pay with confidence with Click to Pay</p>
      </div>
      <Input
        maxLength={75}
        autoFocus
        value={email}
        setValue={setEmail}
        placeholder="Email Address"
        submitFunction={handleSubmit}
        disabled={submitting}
      />
      {!isValidEmail && (
        <p className="text-red-600 mt-1 text-sm">Email is not valid</p>
      )}
      <p className="my-3 mb-1 text-sm">
        By continuing, you agree to Visa's{" "}
        <a href="#" className="underline text-blue-700">
          Privacy Notice.
        </a>
      </p>
      <Button onClick={handleSubmit} title="CONTINUE" loading={submitting} />
    </div>
  );
};

export default EmailInputView;
