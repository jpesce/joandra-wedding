import Image from "next/image";
import { useReducer, useState, useEffect } from "react";
import { QrCodePix as PixQRCode } from "qrcode-pix";

import IconGift from "../../../public/icon-gift.react.svg";
import IconTrash from "../../../public/icon-trash.react.svg";
import IconPlus from "../../../public/icon-plus.react.svg";
import IconMinus from "../../../public/icon-minus.react.svg";
import IconX from "../../../public/icon-x.react.svg";

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
      <IconGift />
    </div>
  );
};

interface PaymentModalProps {
  cart: Cart;
  setPaymentOpen: SetPaymentOpen;
}
const PaymentModal = ({
  cart,
  setPaymentOpen,
}: PaymentModalProps): JSX.Element => {
  const [pixQRCodeImage, setPixQRCodeImage] = useState("");
  const [paymentLink, setPaymentLink] = useState("");

  useEffect(() => {
    (async () => {
      const pixQRCodeInfo = PixQRCode({
        version: "01",
        key: "08974515628",
        name: "João Paulo Barros Cotta Pesce",
        city: "BELO HORIZONTE",
        message: "🎁 Presente de casamento Chandra & João",
        value: cartTotalAmount(cart, giftList),
      });
      const pixQRCodeBase64 = await pixQRCodeInfo.base64();

      setPixQRCodeImage(pixQRCodeBase64);
    })();

    const abortController = new AbortController();
    (async () => {
      const response = await fetch("/api/paymentlink", {
        signal: abortController.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => {
            return {
              title: item.name,
              unit_price: giftList.find((gift) => gift.name === item.name)
                ?.price,
              quantity: item.quantity,
            };
          }),
        }),
      });
      const responseText = await response.text();
      setPaymentLink(responseText);

      return () => abortController.abort();
    })();
  }, [cart]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="rounded-lg bg-white p-8">
        {pixQRCodeImage && (
          <Image
            src={pixQRCodeImage}
            alt="QR code para pagamento via Pix"
            width={320}
            height={320}
          />
        )}
        <button
          className="h-10 w-full rounded-full border border-joanGreen-600 px-4 text-sm uppercase text-joanGreen-600"
          onClick={() => setPaymentOpen(false)}
        >
          Fechar
        </button>
        <p>
          Ou{" "}
          <a
            href={paymentLink}
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            clique aqui para pagar pelo Mercado Pago
          </a>
        </p>
      </div>
    </div>
  );
};

type SetPaymentOpen = React.Dispatch<React.SetStateAction<boolean>>;
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
  const [paymentOpen, setPaymentOpen] = useState(false);

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
            className="h-full w-full object-contain"
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

interface CartReducerAction {
  type: "increaseItemQuantity" | "decreaseItemQuantity" | "removeItem";
  item: string;
}
interface CartReducer extends React.Reducer<Cart, CartReducerAction> {
  (state: Cart, action: CartReducerAction): Cart;
}
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

type UpdateCart = React.Dispatch<React.ReducerAction<CartReducer>>;
type SetItemListOpen = React.Dispatch<React.SetStateAction<boolean>>;
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
