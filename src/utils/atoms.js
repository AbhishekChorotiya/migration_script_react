import { atom } from "jotai";
import { VIEWS } from "./constants/enums";

export const viewAtom = atom(VIEWS.LOADING);
export const selectedCardAtom = atom(null);
export const cardsAtom = atom({ profiles: [] });
export const maskedValidationChannelAtom = atom("");
export const consumerEmailAtom = atom("");
