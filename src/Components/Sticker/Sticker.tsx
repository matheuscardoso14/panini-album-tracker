import styles from "./Sticker.module.scss";

function Sticker({ number, team }: { number: number | string, team: string }) {
    return (
        <div className={styles.sticker}>
            <p className={styles.sticker__number}>{number}</p>
            <p className={styles.sticker__team}>{team}</p>
        </div>
    )
}

export default Sticker;