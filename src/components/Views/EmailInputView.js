import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";
import { validateEmail } from "../../utils/helpers";
import FloatingLabelInput from "../common/FloatingLabelInput";
import LockIcon from "../icons/LockIcon";
import { newUI } from "../../migration";

const EmailInputView = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("consumerEmail") || ""
  );
  const [collapsed, setCollapsed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const UiType = newUI ? "NEW" : "OLD";
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
  if (UiType === "OLD") {
    return (
      <div className="p-5 flex h-full flex-col">
        <div className="w-full border-b border-black py-4 flex flex-col gap-2">
          <h1 className="text-2xl text-center">
            Easy and smart online checkout
          </h1>
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
  } else {
    return (
      <div className="p-5 flex h-full flex-col">
        <div className="w-full py-5 flex flex-col gap-2">
          <h1 className="text-2xl text-center">
            Easy and smart online checkout
          </h1>
          <p className="text-center">Pay with confidence with Click to Pay</p>
        </div>
        <FloatingLabelInput
          maxLength={75}
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          disabled={submitting}
        />
        {!isValidEmail && (
          <p className="text-red-600 mt-1 text-sm">Email is not valid</p>
        )}
        <div className="flex w-full mt-5 gap-3">
          <p>How does Click to Pay use my information?</p>
          <div
            onClick={() => setCollapsed(!collapsed)}
            className={`flex transform transition duration-300 ${
              collapsed ? "rotate-0" : "-rotate-180"
            } justify-center w-5 h-5`}
          >
            <span
              className={`w-3 h-3 transform rotate-45 border-r-2 border-b-2 border-black`}
            ></span>
          </div>
        </div>
        {!collapsed && (
          <p className="text-sm mt-1">
            Click to pay will use your email to check if you have linked cards.{" "}
            <a href="#" className="underline text-blue-700">
              Learn more
            </a>
            <br />A one time passcode may be sent to this email and your mobile
            number to confirm its you. Massage/data rate my apply.
          </p>
        )}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{ backgroundColor: "#005C78" }}
          className="w-full disabled:bg-gray-300 rounded mt-5 flex items-center justify-center gap-2 h-12 text-white"
        >
          <LockIcon /> Load my linked cards
        </button>
      </div>
    );
  }
};

export default EmailInputView;
