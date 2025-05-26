import React, { ChangeEvent, KeyboardEvent, CSSProperties } from "react";

interface InputProps {
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  maxLength?: number;
  submitFunction?: () => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  value,
  setValue,
  maxLength,
  submitFunction = () => { },
  autoFocus = false,
  disabled = false,
}) => {
  const inputStyles: CSSProperties = {
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
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      value={value}
      maxLength={maxLength}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") submitFunction();
      }}
      style={inputStyles}
      disabled={disabled}
    />
  );
};

export default Input;
