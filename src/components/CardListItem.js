import React from "react";

const CardListItem = () => {
  const handleClick = () => {
    console.log("Card clicked");
  };
  return (
    <li
      onClick={handleClick}
      role="button"
      className="flex flex-col hover:bg-gray-100"
    >
      <div className="w-full-100 px-4">
        <div className="w-full flex gap-4 items-center py-4 border-b border-black">
          <div className="w-14 rounded bg-yellow-500 h-10"></div>
          <h1>Mastercard... 4537</h1>
        </div>
      </div>
    </li>
  );
};

export default CardListItem;
