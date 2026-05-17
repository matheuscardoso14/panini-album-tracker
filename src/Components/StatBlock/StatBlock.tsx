import styles from "./StatBlock.module.scss";

function StatBlock({ title, value, color }: { title: string, value: string | number, color: string }) {
  return (
    <div className={styles.block} style={{ backgroundColor: color }}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default StatBlock;