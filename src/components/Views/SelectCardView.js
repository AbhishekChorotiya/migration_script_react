import React from "react";
import CardListItem from "../CardListItem";

const SelectCardView = () => {
  return (
    <div className="flex flex-col">
      <div className="px-5 py-4">
        <h1>SELECT CARD</h1>
        <p>Select from card(s) set up for Click to Pay</p>
      </div>
      <ul>
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
      </ul>
    </div>
  );
};

export default SelectCardView;
