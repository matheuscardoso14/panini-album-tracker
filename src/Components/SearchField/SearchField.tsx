import { useAtom } from "jotai";
import styles from "./SearchField.module.scss";
import { searchTermAtom } from "../../state/searchTermState";

function SearchField({ placeholder }: { placeholder?: string }) {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);

  return (
    <input
      className={styles.input}
      type="search"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      placeholder={placeholder}
    />
  )
}

export default SearchField;