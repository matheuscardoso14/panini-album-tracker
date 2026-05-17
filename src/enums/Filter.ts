/**
 * Defines the available view filters for the user's sticker collection.
 */
enum FilterType {
  /** Displays all stickers without applying any ownership filters */
  ALL = "default",
  /** Displays only stickers that the user possesses at least one of */
  OWNED = "owned",
  /** Displays only stickers that the user does not currently own */
  NOT_OWNED = "not_owned",
  /** Displays only stickers where the user owns more than 1 (available for trading) */
  DUPLICATES = "duplicates",
}

export default FilterType;