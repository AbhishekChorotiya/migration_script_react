import React, { useContext, useState } from "react";
import { getCardNetwork } from "../utils/helpers";
import { ViewContext } from "../utils/context";
import { VIEWS } from "../utils/constants/enums";
import VisaLogo from "./icons/VisaLogo";
import { newUI } from "../migration";
import MasterCardLogo from "./icons/MasterCardLogo";

const CardListItem = ({ card, border }) => {
  const { setSelectedCard, setView, selectedCard } = useContext(ViewContext);
  const cardNetworkName = getCardNetwork(card?.panBin);
  const UiType = newUI ? "NEW" : "OLD";
  const handleClick = () => {
    setSelectedCard(card);
    setView(VIEWS.CHECKOUT);
    console.log("Card clicked", card);
  };
  if (UiType === "OLD") {
    return (
      <li
        onClick={handleClick}
        role="button"
        className="flex flex-col hover:bg-gray-100"
      >
        <div className="w-full-100 px-4">
          <div className="w-full flex gap-4 items-center py-4 border-b border-[#d7d7de]">
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
  } else {
    return (
      <div onClick={() => setSelectedCard(card)}>
        <div
          className={`flex gap-2 cursor-pointer ${
            border && "border-b border-black"
          } items-center w-full`}
        >
          <span className="w-4 h-4 rounded-full border border-black flex items-center justify-center">
            {card?.srcDigitalCardId === selectedCard?.srcDigitalCardId && (
              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
            )}
          </span>
          <div
            className="flex flex-col"
            htmlFor={card?.srcDigitalCardId || "card"}
          >
            <div className="w-full-100 px-4">
              <div className="w-full flex gap-4 items-center py-4">
                <div className="w-14 overflow-hidden rounded h-[36px]">
                  <img
                    src={card?.digitalCardData?.artUri}
                    alt="Card"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="flex flex-col">
                  <span>{cardNetworkName}</span>
                  <div className="flex items-center">
                    <div className="w-8 h-fit mr-1">
                      {cardNetworkName === "Visa" ? (
                        <VisaLogo />
                      ) : (
                        <MasterCardLogo height="25px" width="25px" />
                      )}
                    </div>
                    <span>... {card?.panLastFour}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CardListItem;
