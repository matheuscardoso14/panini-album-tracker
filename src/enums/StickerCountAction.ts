/**
 * Defines the actions available for modifying a sticker's owned count.
 */
enum StickerCountAction {
  /** Increment the user's owned count for a specific sticker */
  INCREASE = "increase",
  /** Decrement the user's owned count for a specific sticker */
  DECREASE = "decrease"
}

export default StickerCountAction;