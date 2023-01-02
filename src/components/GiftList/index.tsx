import Image from "next/image";
import { useReducer, useState } from "react";

import Minicart from "./Minicart";

import giftList from "./data";

const handlePayWhatYouWantInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPayWhaYouWantValue: SetPayWhatYouWantValue
): void => {
  const numbersInValue = event.target.value.replace(/\D/g, "");
  const integerValue = parseInt(numbersInValue) ? parseInt(numbersInValue) : 0;
  setPayWhaYouWantValue(integerValue);

  const stringValue = integerValue > 0 ? integerValue.toString() : "";
  event.target.value = `R$ ${stringValue}`;
};

const submitPayWhatYouWantItem = (
  updateCart: UpdateCart,
  setItemListOpen: SetItemListOpen,
  payWhatYouWantValue: number
): void => {
  if (payWhatYouWantValue === 0) return;

  updateCart({ type: "removeItem", item: "Valor personalizado" });
  updateCart({
    type: "increaseItemQuantity",
    item: "Valor personalizado",
    price: payWhatYouWantValue,
  });
  setItemListOpen(true);
};

const handlePayWhatYouWantInputOnKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  callbackFunction: () => void
): void => {
  if (event.key === "Enter") {
    callbackFunction();
  }
};

interface PayWhatYouWantProps {
  updateCart: UpdateCart;
  setItemListOpen: SetItemListOpen;
}

const PayWhatYouWant = ({
  setItemListOpen,
  updateCart,
}: PayWhatYouWantProps): JSX.Element => {
  const [payWhatYouWantValue, setPayWhatYouWantValue] = useState(0);

  return (
    <div className="mr-[-1px] mt-[-1px] flex flex-col place-items-center border border-joanGreen-600  bg-joanGreen-50 p-4 text-sm">
      <div className="flex grow flex-col justify-center">
        <p className="text-center font-serif text-3xl">Dê o seu valor</p>
        <p className="text-center">Digite o valor do seu presente</p>
        <div className="">
          <input
            id="payWhatYouWantValue"
            defaultValue="R$ "
            maxLength={8}
            name="pay-what-you-want-value"
            className="m-auto mt-4 flex w-full w-40 items-center rounded-full bg-white py-[0.75rem] text-center text-xl"
            onChange={(event) =>
              handlePayWhatYouWantInputChange(event, setPayWhatYouWantValue)
            }
            onKeyDown={(event) => {
              handlePayWhatYouWantInputOnKeyDown(event, () => {
                submitPayWhatYouWantItem(
                  updateCart,
                  setItemListOpen,
                  payWhatYouWantValue
                );
              });
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          submitPayWhatYouWantItem(
            updateCart,
            setItemListOpen,
            payWhatYouWantValue
          );
        }}
        className="mt-4 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-joanGreen-600 bg-white px-5 uppercase text-joanGreen-600 transition hover:bg-joanGreen-600 hover:text-white"
      >
        Presentear
      </button>
    </div>
  );
};

interface GiftProps {
  updateCart: UpdateCart;
  setItemListOpen: SetItemListOpen;
  name: string;
  price: number;
  image: string;
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
            className="h-full w-full select-none object-contain"
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

const cartReducer: CartReducer = (
  state: Cart,
  action: CartReducerAction
): Cart => {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone the state array
  const indexOfItemInCart = newState.findIndex(
    (itemInCart: CartItem) => itemInCart.name === action.item
  );

  switch (action.type) {
    case "increaseItemQuantity":
      if (indexOfItemInCart !== -1) {
        newState[indexOfItemInCart].quantity += 1;
        if (action.price) newState[indexOfItemInCart].price = action.price;

        return newState;
      } else {
        return state.concat({
          name: action.item,
          quantity: 1,
          price: action.price,
        });
      }
    case "decreaseItemQuantity":
      if (indexOfItemInCart === -1) return newState;

      if (newState[indexOfItemInCart].quantity > 1) {
        newState[indexOfItemInCart].quantity -= 1;
        return newState;
      }
      if (newState[indexOfItemInCart].quantity < 1) {
        newState.length > 1
          ? newState.splice(indexOfItemInCart, 1)
          : newState.pop();
        return newState;
      }

      return newState;
    case "removeItem":
      if (indexOfItemInCart === -1) return newState;

      newState.length > 1
        ? newState.splice(indexOfItemInCart, 1)
        : newState.pop();
      return newState;
    default:
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
          <PayWhatYouWant
            updateCart={updateCart}
            setItemListOpen={setItemListOpen}
          />
        </div>
      </div>
    </>
  );
};

export default GiftList;
