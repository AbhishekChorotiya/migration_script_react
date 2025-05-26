import { atom } from "jotai";
import { VIEWS } from "./constants/enums";

export interface SelectedCard {
    srcDigitalCardId: string;
}

export interface CardsAtomType {
    profiles: SelectedCard[];
}

export const viewAtom = atom(VIEWS.LOADING);
export const selectedCardAtom = atom<SelectedCard | null>(null);
export const cardsAtom = atom<CardsAtomType>({ profiles: [] });
export const maskedValidationChannelAtom = atom<string>("");
export const consumerEmailAtom = atom<string>("");
