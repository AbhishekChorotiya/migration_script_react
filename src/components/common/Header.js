import React from "react";
import CloseIcon from "../icons/Close";
import useVisaCheckout from "../../utils/hooks/useVisaCheckout";

export const Header = ({ handleClose = () => {} }) => {
  return (
    <div className="w-full flex px-5 py-2.5 border-b border-black justify-between">
      <span>Logo</span>
      <button type="button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </div>
  );
};
