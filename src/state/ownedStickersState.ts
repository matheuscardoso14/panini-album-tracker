import { atomWithStorage } from "jotai/utils";

export const ownedStickersAtom = atomWithStorage<string[]>("ownedStickers", []);