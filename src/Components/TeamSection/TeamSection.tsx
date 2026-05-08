import styles from "./TeamSection.module.scss";

function TeamSection({ team, children }: { team: string, children: React.ReactElement }) {
    return (
        <section className={styles.team}>
            <h2 className={styles.team__title}>{team}</h2>
            <div className={styles.team__stickers}>
                {children}
            </div>
        </section>
    )
}

export default TeamSection;