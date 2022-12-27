export const cartTotalAmount = (cart: Cart, giftList: GiftList): number => {
  return cart.reduce((total, cartItem) => {
    const gift = giftList.find(gift => gift.name === cartItem.name);
    if(gift) return total + (gift.price * cartItem.quantity)
    return total
  }, 0)
}

export const itemTotalAmount = (cartItem: CartItem, giftList: GiftList): number => {
  const giftListItem = giftList.find(giftListItem => giftListItem.name === cartItem.name)

  return giftListItem ? (cartItem.quantity * giftListItem.price) : 0
}
