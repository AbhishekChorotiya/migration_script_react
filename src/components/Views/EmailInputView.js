import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";
import { validateEmail } from "../../utils/helpers";

const EmailInputView = () => {
  const [email, setEmail] = useState(
    localStorage.getItem("consumerEmail") || ""
  );
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { getCards } = useVisaCheckout();
  const handleSubmit = () => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    getCards(email);
    setIsValidEmail(true);
  };
  const containerStyles = {
    padding: "1.25rem",
    display: "flex",
    flexDirection: "column",
  };
  const headerStyles = {
    width: "100%",
    borderBottom: "1px solid black",
    padding: "1rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };
  const titleStyles = {
    fontSize: "2rem",
    textAlign: "center",
  };
  const subtitleStyles = {
    textAlign: "center",
  };
  const errorTextStyles = {
    color: "#DC2626",
    marginTop: "0.25rem",
    fontSize: "0.875rem",
  };
  const infoTextStyles = {
    margin: "0.75rem 0 0.25rem",
    fontSize: "0.875rem",
  };
  const linkStyles = {
    textDecoration: "underline",
    color: "#1D4ED8",
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Easy and smart online checkout</h1>
        <p style={subtitleStyles}>Pay with confidence with Click to Pay</p>
      </div>
      <Input
        maxLength={75}
        autoFocus
        value={email}
        setValue={setEmail}
        placeholder="Email Address"
        submitFunction={handleSubmit}
      />
      {!isValidEmail && <p style={errorTextStyles}>Email is not valid</p>}
      <p style={infoTextStyles}>
        By continuing, you agree to Visa's{" "}
        <a href="#" style={linkStyles}>
          Privacy Notice.
        </a>
      </p>
      <Button onClick={handleSubmit} title="CONTINUE" />
    </div>
  );
};

export default EmailInputView;
