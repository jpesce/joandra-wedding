import { useState, useEffect } from "react";

import IconGift from "../../../public/icon-gift.react.svg";
import IconTrash from "../../../public/icon-trash.react.svg";
import IconPlus from "../../../public/icon-plus.react.svg";
import IconMinus from "../../../public/icon-minus.react.svg";
import IconX from "../../../public/icon-x.react.svg";

import PaymentModal from "./PaymentModal";

import { cartTotalAmount, itemTotalAmount } from "./cartUtils";
import giftList from "./data";

interface MinicartQuantityBadgeProps {
  itemQuantity: number;
}
const MinicartQuantityBadge = ({
  itemQuantity,
}: MinicartQuantityBadgeProps): JSX.Element => {
  return (
    <div className="absolute top-[-0.5rem] right-0 flex h-[22px] min-w-[22px] select-none items-center justify-center rounded-full bg-black px-[0.4rem] text-xs text-white">
      {itemQuantity}
    </div>
  );
};

interface MinicartItemProps {
  cartItem: CartItem;
  updateCart: UpdateCart;
}
const MinicartItem = ({ cartItem, updateCart }: MinicartItemProps) => {
  return (
    <div className="flex items-center selection:bg-joanGreen-600 selection:text-white">
      <button
        className="mr-2 ml-[-0.25rem] flex h-6 w-6 items-center justify-center rounded-full hover:bg-joanGreen-50"
        onClick={() => updateCart({ type: "removeItem", item: cartItem.name })}
      >
        <IconTrash className="h-[14.5px]" />
      </button>
      <div className="mr-4 flex items-center rounded-full border border-joanGreen-600">
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-joanGreen-50"
          onClick={() =>
            updateCart({ type: "increaseItemQuantity", item: cartItem.name })
          }
        >
          <IconPlus className="h-[18px] stroke-joanGreen-600 stroke-1" />
        </button>
        <div className="w-4 select-none text-center text-xs">
          {cartItem.quantity}
        </div>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-joanGreen-50"
          onClick={() =>
            updateCart({ type: "decreaseItemQuantity", item: cartItem.name })
          }
        >
          <IconMinus className="h-[14px] " />
        </button>
      </div>
      <div className="flex-grow">{cartItem.name}</div>
      <div className="ml-4">R${itemTotalAmount(cartItem, giftList)}</div>
    </div>
  );
};

interface MinicartItemListProps {
  updateCart: UpdateCart;
  setPaymentOpen: SetPaymentOpen;
  cart: Cart;
  setItemListOpen: SetItemListOpen;
  open: boolean;
}
const MinicartItemList = ({
  cart,
  updateCart,
  setPaymentOpen,
  setItemListOpen,
  open,
}: MinicartItemListProps): JSX.Element => {
  if (!open) return <></>;
  return (
    <div className="mb-4 rounded-md shadow-xl">
      <div className="flex w-[29rem] flex-col rounded-md border border-joanGreen-600 bg-white text-sm uppercase text-joanGreen-600">
        <button
          className="absolute -top-[0.85rem] -right-[0.85rem] flex h-8 w-8 items-center justify-center rounded-full border border-joanGreen-600 bg-white hover:bg-joanGreen-50"
          onClick={() => setItemListOpen(false)}
        >
          <IconX className="h-[14px]" />
        </button>
        <div className="space-y-4 p-4 pt-6">
          <div className="space-y-2">
            {cart.map((cartItem, index) => (
              <MinicartItem
                key={index}
                cartItem={cartItem}
                updateCart={updateCart}
              />
            ))}
          </div>
          <div className="border-t border-joanGreen-600 pt-2 text-right text-black selection:bg-black selection:text-white">
            <span className="mr-4">Total</span>
            <span>R${cartTotalAmount(cart, giftList)}</span>
          </div>
        </div>
        <button
          className="h-12 select-none rounded-b-sm border-t border-joanGreen-600 bg-joanGreen-600 text-base uppercase text-white hover:bg-joanGreen-550"
          onClick={() => setPaymentOpen(true)}
        >
          Pagar agora
        </button>
      </div>
    </div>
  );
};

interface MinicartFloatingButtonProps {
  itemQuantity: number;
}
const MinicartFloatingButton = ({
  itemQuantity,
}: MinicartFloatingButtonProps): JSX.Element => {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-joanGreen-600 bg-white text-joanGreen-600 shadow-xl">
      {itemQuantity > 0 && (
        <MinicartQuantityBadge itemQuantity={itemQuantity} />
      )}
      <IconGift className="h-[33px]" />
    </div>
  );
};

interface MinicartProps {
  updateCart: UpdateCart;
  cart: Cart;
  itemListOpen: boolean;
  setItemListOpen: SetItemListOpen;
}
const Minicart = ({
  cart,
  updateCart,
  itemListOpen,
  setItemListOpen,
}: MinicartProps): JSX.Element => {
  const itemQuantity = cart.reduce(
    (accumulator: number, item: CartItem) => (accumulator += item.quantity),
    0
  );
  const [paymentOpen, setPaymentOpen] = useState(true);

  useEffect(() => {
    if (paymentOpen) document.body.style.overflow = "hidden";
    if (!paymentOpen) document.body.style.overflow = "unset";
  }, [paymentOpen]);

  return (
    <>
      {paymentOpen && (
        <PaymentModal cart={cart} setPaymentOpen={setPaymentOpen} />
      )}
      <div className="relative z-40">
        <div className="fixed bottom-12 right-12 flex flex-col items-end">
          {itemQuantity > 0 && (
            <MinicartItemList
              cart={cart}
              updateCart={updateCart}
              setPaymentOpen={setPaymentOpen}
              setItemListOpen={setItemListOpen}
              open={itemListOpen}
            />
          )}
          {itemQuantity > 0 ? (
            <button
              className="rounded-full"
              onClick={() =>
                itemListOpen ? setItemListOpen(false) : setItemListOpen(true)
              }
            >
              <MinicartFloatingButton itemQuantity={itemQuantity} />
            </button>
          ) : (
            <a href="#lista-de-presentes">
              <MinicartFloatingButton itemQuantity={itemQuantity} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Minicart;
