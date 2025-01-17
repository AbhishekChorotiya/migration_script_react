import React from "react";

const Input = ({ placeholder = "" }) => {
  return (
    <input
      placeholder={placeholder}
      className="w-full border-b-2 border-yellow-400 mt-2 py-2"
    />
  );
};

export default Input;
