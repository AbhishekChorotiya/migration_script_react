import React, { useContext } from "react";
import CardListItem from "../CardListItem";
import { ViewContext } from "../../utils/context";

const SelectCardView = () => {
  const { cards } = useContext(ViewContext);
  const maskedCards = cards.profiles[0].maskedCards;
  console.log(maskedCards);
  return (
    <div className="flex flex-col">
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
};

export default SelectCardView;
