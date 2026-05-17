import styles from "./RadioButton.module.scss";

function RadioButton({ func, checked, text }: { func: () => void, checked: boolean, text: string}) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="radio" checked={checked} onChange={() => func()} />
      <label className={styles.label}>{text}</label>
    </div>
  )
}

export default RadioButton;