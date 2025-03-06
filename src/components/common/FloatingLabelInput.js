import React, { useState } from "react";

const FloatingLabelInput = ({
  label = "Email",
  type = "text",
  value,
  onChange,
  submitFunction = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative border border-gray-300 rounded-md focus-within:border-blue-500 p-3 py-5">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent outline-none transform translate-y-1/4"
        {...props}
      />
      <label
        className={`absolute left-2 transition-all duration-200 pointer-events-none text-gray-500 
          ${
            isFocused || value
              ? "text-xs top-1 bg-white px-1"
              : "text-base top-1/2 transform -translate-y-1/2"
          }`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
