import Sticker from "../Sticker/Sticker";
import styles from "./TeamSection.module.scss";

function TeamSection() {
    return (
        <section className={styles.team}>
            <h2 className={styles.team__title}>Brazil</h2>
            <div className={styles.team__stickers}>
                <Sticker number="67" team="BRA" />
                <Sticker number="42" team="BRA" />
            </div>
        </section>
    )
}

export default TeamSection;