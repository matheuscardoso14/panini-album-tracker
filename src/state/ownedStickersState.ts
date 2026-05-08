import { atomWithStorage } from "jotai/utils";

export interface ownedSticker {
  id: string,
  count: number
}

export const ownedStickersAtom = atomWithStorage<ownedSticker[]>("ownedStickers", []);