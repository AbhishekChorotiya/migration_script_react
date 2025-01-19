import React from "react";
import CloseIcon from "../icons/Close";

export const Header = ({ handleClose = () => {} }) => {
  const headerStyles = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    borderBottom: "1px solid black",
    alignItems: "center",
  };

  return (
    <div style={headerStyles}>
      <span>Logo</span>
      <button
        type="button"
        onClick={handleClose}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};
