import type { Dispatch } from "react";
import { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext({
  cart: {} as Cart,
  updateCart: {} as Dispatch<CartReducerAction>,
});

const cartReducer: CartReducer = (state, action): Cart => {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone the state array
  newState.lastAction = action;

  const indexOfItemInCart = newState.items.findIndex(
    (itemInCart: CartItem) => itemInCart.name === action.item
  );
  const isItemInCart = indexOfItemInCart !== -1;
  const isLastOfItem =
    isItemInCart && newState.items[indexOfItemInCart].quantity <= 1;
  const cartHasOneTypeOfItem = newState.items.length <= 1;

  switch (action.type) {
    case "increaseItemQuantity":
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
          lastAction: "a",
        });
      }

      return newState;
    case "removeItem":
      if (isItemInCart && cartHasOneTypeOfItem) newState.items.pop();
      if (isItemInCart && !cartHasOneTypeOfItem)
        newState.items.splice(indexOfItemInCart, 1);

      return newState;
    case "decreaseItemQuantity":
      if (!isLastOfItem) newState[indexOfItemInCart].quantity -= 1;
      if (isLastOfItem && cartHasOneTypeOfItem) newState.items.pop();
      if (isLastOfItem && !cartHasOneTypeOfItem)
        newState.items.splice(indexOfItemInCart, 1);

      return newState;
    default:
      return newState;
  }
};

type CartProviderProps = {
  children: React.ReactNode;
};
const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
  const [cart, updateCart] = useReducer<CartReducer>(cartReducer, {
    items: [],
  });

  useEffect(() => {
    if (cart?.lastAction?.type === "increaseItemQuantity") {
      document.dispatchEvent(new CustomEvent("increaseItemQuantity"));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
