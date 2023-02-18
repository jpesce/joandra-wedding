import type { Dispatch } from "react";
import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

import giftList from "./data";

const CartContext = createContext({
  cart: {} as Cart,
  updateCart: {} as Dispatch<CartReducerAction>,
  cartTotalAmount: 0,
  itemTotalAmount: {} as ItemTotalAmount,
});

const cartReducer: CartReducer = (state, action): Cart => {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone the state array

  const indexOfItemInCart =
    (action.type === "increaseItemQuantity" ||
      action.type === "decreaseItemQuantity" ||
      action.type === "removeItem") &&
    newState.items.findIndex(
      (itemInCart: CartItem) => itemInCart.name === action.item
    );
  const isItemInCart = indexOfItemInCart !== false && indexOfItemInCart > -1;
  const isLastOfItem =
    isItemInCart && newState.items[indexOfItemInCart].quantity <= 1;
  const cartHasOneTypeOfItem = newState.items.length <= 1;

  switch (action.type) {
    case "setCart":
      newState.items = action.cart.items;
      newState.lastAction = action;

      return newState;
    case "increaseItemQuantity":
      newState.lastAction = action;
      if (isItemInCart) {
        newState.items[indexOfItemInCart].quantity += 1;
        if (action.price)
          newState.items[indexOfItemInCart].price = action.price;
      }
      if (!isItemInCart) {
        newState.items.push({
          name: action.item,
          quantity: 1,
          price: action.price,
        });
      }

      return newState;
    case "removeItem":
      newState.lastAction = action;
      if (isItemInCart && cartHasOneTypeOfItem) newState.items.pop();
      if (isItemInCart && !cartHasOneTypeOfItem)
        newState.items.splice(indexOfItemInCart, 1);

      return newState;
    case "decreaseItemQuantity":
      newState.lastAction = action;
      if (!isLastOfItem) newState[indexOfItemInCart].quantity -= 1;
      if (isLastOfItem && cartHasOneTypeOfItem) newState.items.pop();
      if (isLastOfItem && !cartHasOneTypeOfItem)
        newState.items.splice(indexOfItemInCart, 1);

      return newState;
    default:
      return newState;
  }
};

type ItemTotalAmount = (cart: CartItem) => number;
type CartProviderProps = {
  cartFromServer?: Cart;
  children: React.ReactNode;
};
function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, updateCart] = useReducer<CartReducer>(cartReducer, {
    items: [],
  });
  // Store if it's the first render so things that should be run only on first
  // render work with reactStrictMode
  const isFirstRun = useRef(true);

  useEffect(() => {
    const cookies = document.cookie;
    const cartCookie = cookies
      ?.split("; ")
      .find((item) => item.startsWith("cart="))
      ?.split("=")[1];
    const cart = cartCookie && JSON.parse(cartCookie);

    if (isFirstRun.current && cart) updateCart({ type: "setCart", cart: cart });
    isFirstRun.current = false;
  }, []);

  useEffect(() => {
    // Since we only have one cookie, it's easy to maniputate it directly. If we
    // use more cookies, we should probably use something more robust
    document.cookie = `cart=${JSON.stringify(cart)}`;
  }, [cart]);

  const cartTotalAmount = useMemo(() => {
    return cart.items.reduce((total, cartItem) => {
      const gift = giftList.find((gift) => gift.name === cartItem.name);
      if (cartItem.price) return total + cartItem.price * cartItem.quantity;
      if (gift) return total + gift.price * cartItem.quantity;

      return total;
    }, 0);
  }, [cart]);

  const itemTotalAmount: ItemTotalAmount = useCallback((cartItem) => {
    const giftListItem = giftList.find(
      (giftListItem) => giftListItem.name === cartItem.name
    );

    return giftListItem ? cartItem.quantity * giftListItem.price : 0;
  }, []);

  useEffect(() => {
    if (cart?.lastAction?.type === "increaseItemQuantity") {
      document.dispatchEvent(new CustomEvent("increaseItemQuantity"));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, updateCart, cartTotalAmount, itemTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
