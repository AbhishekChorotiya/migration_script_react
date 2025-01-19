import React from "react";

const Button = ({ onClick = () => {}, title = "Submit" }) => {
  const buttonStyles = {
    backgroundColor: "#1E40AF",
    color: "white",
    padding: "10px",
    borderRadius: "2px",
    margin: "12px 0",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <button type="button" onClick={onClick} style={buttonStyles}>
      {title}
    </button>
  );
};

export default Button;
