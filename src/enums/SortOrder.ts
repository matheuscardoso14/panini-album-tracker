/**
 * Defines the directional sorting options for the sticker grid.
 */
enum SortOrder {
  /** Retains the default sorting order (e.g., standard album or search result order) */
  DEFAULT = "default",
  /** Sorts the list in ascending order (e.g., lowest count first) */
  ASCENDING = "asc",
  /** Sorts the list in descending order (e.g., highest count first) */
  DESCENDING = "desc"
}

export default SortOrder;