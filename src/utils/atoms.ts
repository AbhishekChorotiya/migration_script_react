import { atom } from "jotai";
import { VIEWS } from "./constants/enums";

export interface SelectedCard {
    srcDigitalCardId: string;
    // Add other properties of a selected card if known
}

export interface CardsAtomType {
    profiles: SelectedCard[];
    // Add other properties of cards if known
}

export const viewAtom = atom(VIEWS.LOADING);
export const selectedCardAtom = atom<SelectedCard | null>(null);
export const cardsAtom = atom<CardsAtomType>({ profiles: [] });
export const maskedValidationChannelAtom = atom<string>("");
export const consumerEmailAtom = atom<string>("");
