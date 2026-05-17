import styles from "./Sticker.module.scss";
import { useAtom } from "jotai";
import { ownedStickersAtom } from "../../state/ownedStickersState";
import StickerCountAction from "../../enums/StickerCountAction";

/**
 * Sticker Component
 * Represents an individual sticker in the album grid.
 * Provides interactions to mark a sticker as owned/unowned and to track duplicate counts.
 */
function Sticker({ name, number, team, id }: { name: string, number: number | string, team: string, id: string }) {
  // Global state holding the user's collection of owned stickers
  const [ownedStickers, setOwnedStickers] = useAtom(ownedStickersAtom);
  
  // Determine the current count of this specific sticker in the user's collection
  const stickerCount = ownedStickers.find((sticker) => sticker.id === id)?.count ?? 0;
  const isOwned = (stickerCount > 0);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isOwned) {
      // If already owned, clicking the sticker removes it entirely from the collection
      setOwnedStickers(ownedStickers.filter((sticker) => sticker.id !== id));
    } else {
      // If not owned, clicking adds it to the collection with a count of 1
      setOwnedStickers([...ownedStickers, { id, count: 1 }]);
    }
  }

  const changeStickerCount = (action: StickerCountAction) => {
    // Calculate the new count based on the requested action, preventing negative counts
    let newCount = stickerCount;
    if (action === StickerCountAction.INCREASE) newCount += 1;
    if (action === StickerCountAction.DECREASE && stickerCount - 1 >= 0) newCount -= 1;
    
    const hasSticker = ownedStickers.find((sticker) => sticker.id === id);
    // If the sticker exists in the collection, update its count. Otherwise, add it with the new count.
    const newOwnedStickers = hasSticker ? ownedStickers.map((sticker) => sticker.id === id ? { ...sticker, count: newCount } : sticker) : ownedStickers.concat({ id, count: newCount });
    setOwnedStickers(newOwnedStickers);
  }

  return (
    <div className={styles.container}>
      {/* Main sticker card, toggles ownership on click */}
      <div className={`${styles.sticker} ${isOwned ? styles.owned : styles["not-owned"]}`} onClick={onClick}>
          <p className={styles.sticker__name}>{name}</p>
          <p className={styles.sticker__number}>{number}</p>
          <p className={styles.sticker__team}>{team}</p>
      </div>
      {/* Controls for managing duplicate sticker counts */}
      <div className={styles["repeated-counter"]}>
        <button className={styles.decrease} onClick={() => changeStickerCount(StickerCountAction.DECREASE)}>-</button>
        <p className={styles.count}>{stickerCount}</p>
        <button className={styles.increase} onClick={() => changeStickerCount(StickerCountAction.INCREASE)}>+</button>
      </div>
    </div>
  )
}

export default Sticker;