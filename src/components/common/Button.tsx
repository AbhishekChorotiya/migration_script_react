import React from "react";

interface ButtonProps {
  onClick?: () => void;
  title?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick = () => { },
  title = "Submit",
  loading = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="bg-blue-800 h-10 flex flex-col items-center justify-center text-white p-2.5 rounded-sm my-3"
    >
      {!loading && title}
      {loading && (
        <div className="flex space-x-2 justify-center items-center h-screen">
          <div
            style={{ animationDelay: "0s" }}
            className="h-3 w-3 bg-white opacity-75 rounded-full animate-bounce"
          ></div>
          <div
            style={{ animationDelay: "0.2s" }}
            className="h-3 w-3 bg-white opacity-75 rounded-full animate-bounce"
          ></div>
          <div
            style={{ animationDelay: "0.4s" }}
            className="h-3 w-3 bg-white opacity-75  rounded-full animate-bounce"
          ></div>
        </div>
      )}
    </button>
  );
};

export default Button;
