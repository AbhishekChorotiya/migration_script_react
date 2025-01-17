import React from "react";

const Button = ({ onClick = () => {}, title = "Submit" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-blue-800 text-white p-2.5 rounded-sm my-3"
    >
      {title}
    </button>
  );
};

export default Button;
