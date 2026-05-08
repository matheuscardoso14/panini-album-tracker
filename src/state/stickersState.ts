import { atom } from "jotai";

export interface Sticker {
  id: string;
  name: string;
  number: number;
  team: string;
}

export const stickersAtom = atom<Promise<Sticker[]>>(async () => {
  const response = await fetch("/stickers.json");
  if (!response.ok) throw new Error("Failed to load stickers.");
  
  return response.json();
});