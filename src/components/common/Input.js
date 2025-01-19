import React from "react";

const Input = ({ placeholder = "", value, setValue, maxLength }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      value={value}
      maxLength={maxLength}
      className="w-full outline-none border-b-2 border-yellow-400 mt-2 py-2"
    />
  );
};

export default Input;
