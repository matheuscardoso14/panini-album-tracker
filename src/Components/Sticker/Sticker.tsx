import { useAtom } from "jotai";
import styles from "./Sticker.module.scss";
import { ownedStickersAtom } from "../../state/ownedStickersState";
import { useEffect } from "react";

function Sticker({ number, team, id }: { number: number | string, team: string, id: string }) {
  const [ownedStickers, setOwnedStickers] = useAtom(ownedStickersAtom);
  const isOwned = ownedStickers.includes(id);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isOwned) {
      setOwnedStickers(ownedStickers.filter((stickerId) => stickerId !== id));
    } else {
      setOwnedStickers([...ownedStickers, id]);
    }
  }

  useEffect(() => {
    localStorage.setItem("ownedStickers", JSON.stringify(ownedStickers));
  }, [ownedStickers])

  return (
    <div className={`${styles.sticker} ${isOwned ? styles.owned : styles["not-owned"]}`} onClick={onClick}>
        <p className={styles.sticker__number}>{number}</p>
        <p className={styles.sticker__team}>{team}</p>
    </div>
  )
}

export default Sticker;