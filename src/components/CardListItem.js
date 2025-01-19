import React, { useContext } from "react";
import { getCardNetwork } from "../utils/helpers";
import { ViewContext } from "../utils/context";
import { VIEWS } from "../utils/constants/enums";

const CardListItem = ({ card }) => {
  const { setSelectedCard, setView } = useContext(ViewContext);

  const handleClick = () => {
    setSelectedCard(card);
    setView(VIEWS.CHECKOUT);
    console.log("Card clicked", card);
  };
  return (
    <li
      onClick={handleClick}
      role="button"
      className="flex flex-col hover:bg-gray-100"
    >
      <div className="w-full-100 px-4">
        <div className="w-full flex gap-4 items-center py-4 border-b border-black">
          <div className="w-16 overflow-hidden rounded h-10">
            <img
              src={card?.digitalCardData?.artUri}
              alt="Card"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <h1>
            {getCardNetwork(card?.panBin)}... {card?.panLastFour}
          </h1>
        </div>
      </div>
    </li>
  );
};

export default CardListItem;
