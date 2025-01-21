import React from "react";
import CloseIcon from "../icons/Close";
import C2pLogo from "../icons/C2pLogo";

export const Header = ({ handleClose = () => {} }) => {
  return (
    <div className="w-full flex px-5 py-2.5 border-b border-black justify-between">
      <span className="w-7 h-6 flex items-center">
        <C2pLogo />
      </span>
      <button type="button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </div>
  );
};
