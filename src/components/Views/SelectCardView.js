import React from "react";
import CardListItem from "../CardListItem";
import LockIcon from "../icons/LockIcon";
import { useAtom } from "jotai";
import { cardsAtom, viewAtom, selectedCardAtom } from "../../utils/atoms";
import C2pLogo from "../icons/C2pLogo";
import VisaLogo from "../icons/VisaLogo";
import MasterCardLogo from "../icons/MasterCardLogo";
import { VIEWS } from "../../utils/constants/enums";
import { newUI } from "../../migration";

const SelectCardView = () => {
  const [cards] = useAtom(cardsAtom);
  const maskedCards = cards.profiles[0].maskedCards;
  const [selectedCard, setSelectedCard] = useAtom(selectedCardAtom);
  const [, setView] = useAtom(viewAtom);
  const UiType = newUI ? "NEW" : "OLD";
  console.log(maskedCards);
  if (UiType === "OLD") {
    return (
      <div className="flex flex-col overflow-y-scroll">
        <div className="px-5 py-4">
          <h1>SELECT CARD</h1>
          <p className="text-sm">Select from card(s) set up for Click to Pay</p>
        </div>
        <ul>
          {maskedCards.map((card, i) => {
            return <CardListItem card={card} key={i} />;
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="px-4 overflow-y-scroll pb-5">
        <div className="flex flex-col ">
          <div className="flex flex-col gap-4 pt-4">
            <div className="border px-4 border-black rounded">
              {maskedCards.map((card, i) => {
                return (
                  <CardListItem
                    border={i < maskedCards.length - 1}
                    card={card}
                    key={i}
                  />
                );
              })}
            </div>
            <button
              onClick={() => {
                if (selectedCard?.srcDigitalCardId) {
                  setView(VIEWS.CHECKOUT);
                }
              }}
              style={{ backgroundColor: "#005C78" }}
              className="w-full rounded flex items-center justify-center gap-2 h-12 mt-2 font-semibold text-white"
            >
              <LockIcon /> Pay
            </button>
            <div className="h-10 w-full flex justify-center items-center">
              <div className="flex h-7 w-7">
                <C2pLogo />
              </div>
              <div className="w-0.5 mx-2 h-7 border-r border-black" />
              <div className="flex h-7 w-8">
                <VisaLogo />
              </div>
              <div className="flex h-7 flex items-center justify-center mx-2 w-7">
                <MasterCardLogo />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SelectCardView;
