import styles from "./Sticker.module.scss";
import { useAtom } from "jotai";
import { ownedStickersAtom } from "../../state/ownedStickersState";
import changeStickerCountType from "../../enums/changeStickerCountType";

function Sticker({ name, number, team, id }: { name: string, number: number | string, team: string, id: string }) {
  const [ownedStickers, setOwnedStickers] = useAtom(ownedStickersAtom);
  const stickerCount = ownedStickers.find((sticker) => sticker.id === id)?.count ?? 0;
  const isOwned = (stickerCount > 0);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isOwned) {
      setOwnedStickers(ownedStickers.filter((sticker) => sticker.id !== id));
    } else {
      setOwnedStickers([...ownedStickers, { id, count: 1 }]);
    }
  }

  const changeStickerCount = (type: changeStickerCountType) => {
    let newCount = stickerCount;
    if (type === changeStickerCountType.INCREASE) newCount += 1;
    if (type === changeStickerCountType.DECREASE && stickerCount - 1 >= 0) newCount -= 1;
    
    const hasSticker = ownedStickers.find((sticker) => sticker.id === id);
    const newOwnedStickers = hasSticker ? ownedStickers.map((sticker) => sticker.id === id ? { ...sticker, count: newCount } : sticker) : ownedStickers.concat({ id, count: newCount });
    setOwnedStickers(newOwnedStickers);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.sticker} ${isOwned ? styles.owned : styles["not-owned"]}`} onClick={onClick}>
          <p className={styles.sticker__name}>{name}</p>
          <p className={styles.sticker__number}>{number}</p>
          <p className={styles.sticker__team}>{team}</p>
      </div>
      <div className={styles["repeated-counter"]}>
        <button className={styles.decrease} onClick={() => changeStickerCount(changeStickerCountType.DECREASE)}>-</button>
        <p className={styles.count}>{stickerCount}</p>
        <button className={styles.increase} onClick={() => changeStickerCount(changeStickerCountType.INCREASE)}>+</button>
      </div>
    </div>
  )
}

export default Sticker;