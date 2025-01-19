import React from "react";

const Input = ({
  placeholder = "",
  value,
  setValue,
  maxLength,
  submitFunction = () => {},
  autoFocus = false,
}) => {
  const inputStyles = {
    width: "100%",
    outline: "none",
    borderBottom: "2px solid #FACC15",
    marginTop: "8px",
    padding: "8px 0",
    fontSize: "16px",
  };

  return (
    <input
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      maxLength={maxLength}
      onKeyDown={(e) => {
        if (e.key === "Enter") submitFunction();
      }}
      style={inputStyles}
    />
  );
};

export default Input;
