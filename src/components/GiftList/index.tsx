import Image from "next/image";
import { useReducer, useState } from "react";

import Minicart from "./Minicart";

import giftList from "./data";

interface GiftProps {
  updateCart: UpdateCart;
  name: string;
  price: number;
  image: string;
  setItemListOpen: SetItemListOpen;
}
const Gift = ({
  updateCart,
  name,
  price,
  image,
  setItemListOpen,
}: GiftProps): JSX.Element => {
  return (
    <div className="mr-[-1px] mt-[-1px] border border-joanGreen-600 p-4 text-sm uppercase">
      <div className="flex">
        <div className="flex-grow">{name}</div>
        <div>R${price}</div>
      </div>
      <div className="relative mt-2 pb-[125%]">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <Image
            className="h-full w-full object-contain select-none"
            src={require(`../../../public/${image}`)}
            alt={name}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setItemListOpen(true);
          updateCart({ type: "increaseItemQuantity", item: name });
        }}
        className="mt-4 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-joanGreen-600 px-5 uppercase text-joanGreen-600 transition hover:bg-joanGreen-600 hover:text-white"
      >
        Presentear
      </button>
    </div>
  );
};

const cartReducer: CartReducer = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone the state array
  const indexOfItemInCart = newState.findIndex(
    (itemInCart: CartItem) => itemInCart.name === action.item
  );

  switch (action.type) {
    case "increaseItemQuantity":
      if (indexOfItemInCart !== -1) {
        newState[indexOfItemInCart].quantity += 1;

        return newState;
      } else {
        return state.concat({
          name: action.item,
          quantity: 1,
        });
      }
    case "decreaseItemQuantity":
      if (newState[indexOfItemInCart].quantity > 1) {
        newState[indexOfItemInCart].quantity -= 1;
      } else {
        newState.length > 1
          ? newState.splice(indexOfItemInCart, 1)
          : newState.pop();
      }
      return newState;
    case "removeItem":
      newState.length > 1
        ? newState.splice(indexOfItemInCart, 1)
        : newState.pop();
      return newState;
  }
};
const GiftList = (): JSX.Element => {
  const [cart, updateCart] = useReducer<CartReducer>(cartReducer, []);
  const [itemListOpen, setItemListOpen] = useState(false);

  return (
    <>
      <Minicart
        cart={cart}
        updateCart={updateCart}
        itemListOpen={itemListOpen}
        setItemListOpen={setItemListOpen}
      />
      <div className="space-y-16 border-t border-joanGreen-600 p-20 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white">
        <div className="text-center font-serif text-4xl">Dê seu presente</div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))] pt-[1px] pr-[1px]">
          {giftList.map((gift, index) => (
            <Gift
              key={index}
              updateCart={updateCart}
              name={gift.name}
              price={gift.price}
              image={gift.image}
              setItemListOpen={setItemListOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GiftList;
