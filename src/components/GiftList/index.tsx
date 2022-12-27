import Image from "next/image";
import { useReducer, useState, useEffect } from "react";
import { QrCodePix as PixQRCode } from 'qrcode-pix';

import { cartTotalAmount, itemTotalAmount } from "./cartUtils"
import giftList from "./data"

interface MinicartQuantityBadgeProps {
  itemQuantity: number
}
const MinicartQuantityBadge = ({ itemQuantity }: MinicartQuantityBadgeProps): JSX.Element => {
  return (
    <div className="absolute top-[-0.5rem] right-0 rounded-full bg-rose-500 h-6 min-w-[1.5rem] px-[0.4rem] text-white text-sm flex justify-center items-center">
      {itemQuantity}
    </div>
  )
}

interface MinicartItemProps {
  cartItem: CartItem
  updateCart: UpdateCart
}
const MinicartItem = ({ cartItem, updateCart }: MinicartItemProps) => {
  return (
    <div className="flex">
      <div className="mr-4">
        <button className="border border-joanGreen-500 rounded-full h-6 w-6 inline-flex justify-center items-center"
                onClick={() => updateCart({ type: "increaseItemQuantity", item: cartItem.name })}>
          +
        </button>
        <button className="border border-joanGreen-500 rounded-full h-6 w-6 inline-flex justify-center items-center"
                onClick={() => updateCart({ type: "decreaseItemQuantity", item: cartItem.name })}>
          -
        </button>
        <button className="border border-joanGreen-500 rounded-full h-6 w-6 inline-flex justify-center items-center"
                onClick={() => updateCart({ type: "removeItem", item: cartItem.name })}>
          x
        </button>
      </div>
      <div className="mr-2">{cartItem.quantity}x</div>
      <div className="flex-grow">{cartItem.name}</div>
      <div className="ml-4">${itemTotalAmount(cartItem, giftList)}</div>
    </div>
  )
}

interface MinicartItemListProps {
  updateCart: UpdateCart
  setPaymentOpen: SetPaymentOpen
  cart: Cart
}
const MinicartItemList = ({ cart, updateCart, setPaymentOpen }: MinicartItemListProps) => {
  return (
    <>
      <div className="bg-white flex flex-col p-4 border border-joanGreen-500 rounded-md mb-4 text-joanGreen-500 uppercase space-y-2 text-sm">
        {cart.map((cartItem, index) => <MinicartItem key={index} cartItem={cartItem} updateCart={updateCart} />)}
        <div className="pt-2 border-t border-joanGreen-500 text-right">
          <span className="mr-4">Total</span>
          ${cartTotalAmount(cart, giftList)}
        </div>
        <button className="bg-joanGreen-500 text-white h-10 uppercase rounded-sm"
                onClick={() => setPaymentOpen(true)}>
          Pagar
        </button>
      </div>
    </>
  )
}

interface MinicartFloatingButtonProps {
  itemQuantity: number
}
const MinicartFloatingButton = ({ itemQuantity }: MinicartFloatingButtonProps ): JSX.Element => {
  return (
    <div className="rounded-full bg-white border border-joanGreen-500 h-16 w-16 flex items-center justify-center text-joanGreen-500 relative">
      {(itemQuantity > 0) && <MinicartQuantityBadge itemQuantity={itemQuantity}/>}
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12.9204 3.05578L15.9992 7.90214L19.0211 3.05571C19.8586 1.73971 21.2957 0.900024 22.8555 0.900024H23.0313C25.3717 0.900024 27.35 2.87839 27.35 5.21877C27.35 6.49834 26.7827 7.6223 25.9365 8.40002H28.1875C29.7662 8.40002 31.1 9.73386 31.1 11.3125V13.1875C31.1 14.4379 30.2838 15.5096 29.225 15.9504V27.25C29.225 29.4156 27.48 31.1 25.375 31.1H6.62502C4.46042 31.1 2.77502 29.4146 2.77502 27.25V15.9517C1.65871 15.5106 0.900024 14.4363 0.900024 13.1875V11.3125C0.900024 9.73522 2.17391 8.40002 3.81252 8.40002H6.00582C5.16502 7.62056 4.65002 6.49572 4.65002 5.21877C4.65002 2.87929 6.5689 0.900024 8.96877 0.900024H9.08596C10.6458 0.900024 12.0829 1.73978 12.9204 3.05578ZM27.25 5.21875C27.25 6.56641 26.6055 7.73828 25.668 8.5C25.7081 8.46742 25.7477 8.43409 25.7867 8.40002C26.6595 7.63771 27.25 6.50875 27.25 5.21875ZM17.0017 8.40002L20.0104 3.63151L20.012 3.62885C20.5796 2.66397 21.6597 2.03752 22.8555 2.03752H23.0313C24.7339 2.03752 26.2125 3.51619 26.2125 5.21877C26.2125 6.9788 24.735 8.40002 23.0313 8.40002H17.0017ZM9.08596 2.03752C10.2818 2.03752 11.3619 2.66397 11.9295 3.62885L14.9398 8.40002H8.96877C7.2076 8.40002 5.78752 6.97995 5.78752 5.21877C5.78752 3.51503 7.20875 2.03752 8.96877 2.03752H9.08596ZM2.03752 11.3125C2.03752 10.3696 2.81508 9.53753 3.81252 9.53753H15.4313V14.9625H3.81252C2.81307 14.9625 2.03752 14.187 2.03752 13.1875V11.3125ZM28.1875 14.9625H16.5688V9.53753H28.1875C29.1284 9.53753 29.9625 10.3717 29.9625 11.3125V13.1875C29.9625 14.185 29.1304 14.9625 28.1875 14.9625ZM15.4313 16.1V29.9625H6.62502C5.09822 29.9625 3.91252 28.7768 3.91252 27.25V16.1H15.4313ZM28.0875 27.25C28.0875 28.7755 26.8446 29.9625 25.375 29.9625H16.5688V16.1H28.0875V27.25Z" fill="currentColor"/>
      </svg>
    </div>
  )
}

interface PaymentModalProps {
  cart: Cart
  setPaymentOpen: SetPaymentOpen
}
const PaymentModal = ({ cart, setPaymentOpen }: PaymentModalProps): JSX.Element => {
  const [pixQRCodeImage, setPixQRCodeImage] = useState("");

  useEffect(() => {
    const generatePixQRCode = async () => {
      const pixQRCodeInfo = PixQRCode({
          version: '01',
          key: '08974515628',
          name: 'João Paulo Barros Cotta Pesce',
          city: 'BELO HORIZONTE',
          message: '🎁 Presente de casamento Chandra & João',
          value: cartTotalAmount(cart, giftList),
      });
      const pixQRCodeBase64 = await pixQRCodeInfo.base64();

      setPixQRCodeImage(pixQRCodeBase64);
    }

    generatePixQRCode();
  }, [cart])

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        {pixQRCodeImage && <Image src={pixQRCodeImage} alt="QR code para pagamento via Pix" width={320} height={320}/>}
        <button className="border border-joanGreen-500 text-joanGreen-500 w-full h-10 px-4 uppercase text-sm rounded-full"
                onClick={() => setPaymentOpen(false)}>
          Fechar
        </button>
      </div>
    </div>
  )
}

type SetPaymentOpen = React.Dispatch<React.SetStateAction<boolean>>
interface MinicartProps {
  updateCart: UpdateCart
  cart: Cart
}
const Minicart = ({ cart, updateCart }: MinicartProps): JSX.Element => {
  const itemQuantity = cart.reduce((accumulator: number, item: CartItem) => accumulator += item.quantity, 0);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    if(paymentOpen) document.body.style.overflow = "hidden";
    if(!paymentOpen) document.body.style.overflow = "unset";
  }, [paymentOpen]);

  return (
      <>
        {paymentOpen && <PaymentModal cart={cart} setPaymentOpen={setPaymentOpen} />}
        <div className="relative z-40">
          <div className="fixed bottom-12 right-12 flex flex-col items-end">
            {(itemQuantity > 0) && <MinicartItemList cart={cart} updateCart={updateCart} setPaymentOpen={setPaymentOpen} />}
            {(itemQuantity > 0) ?
              <MinicartFloatingButton itemQuantity={itemQuantity} />
              :
              <a href="#lista-de-presentes">
                <MinicartFloatingButton itemQuantity={itemQuantity} />
              </a>
            }
          </div>
        </div>
    </>
  );
}

interface GiftProps {
  updateCart: UpdateCart
  name: string
  price: number
  image: string
}
const Gift = ({ updateCart, name, price, image}: GiftProps): JSX.Element => {
  return (
    <div className="border border-joanGreen-500 p-4 text-sm uppercase mr-[-1px] mt-[-1px]">
      <div className="flex">
        <div className="flex-grow">{name}</div>
        <div>${price}</div>
      </div>
      <div className="mt-2 pb-[125%] relative">
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <Image className="w-full h-full object-contain" src={require(`../../../public/${image}`)} alt={name} />
        </div>
      </div>
      <button onClick={() => updateCart({ type: "increaseItemQuantity", item: name })} className="mt-4 min-h-[2.5rem] px-5 w-full transition select-none text-joanGreen-500 border border-joanGreen-500 rounded-full hover:text-white hover:bg-joanGreen-500 inline-flex items-center justify-center uppercase">
        Presentear
      </button>
    </div>
  );
}

interface CartReducerAction {
  type: "increaseItemQuantity" | "decreaseItemQuantity" | "removeItem"
  item: string
}
interface CartReducer extends React.Reducer<Cart, CartReducerAction> {
  (state: Cart, action: CartReducerAction): Cart
}
const cartReducer: CartReducer = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state)); // Deep clone the state array
  const indexOfItemInCart = newState.findIndex((itemInCart: CartItem) => itemInCart.name === action.item);

  switch(action.type) {
    case "increaseItemQuantity":
      if(indexOfItemInCart !== -1) {
        newState[indexOfItemInCart].quantity += 1;

        return newState;
      } else {
        return state.concat({
          name: action.item,
          quantity: 1
        });
      }
    case "decreaseItemQuantity":
      if(newState[indexOfItemInCart].quantity > 1) {
        newState[indexOfItemInCart].quantity -= 1;
      } else {
        (newState.length > 1) ? newState.splice(indexOfItemInCart, 1) : newState.pop();
      }
      return newState;
    case "removeItem":
      (newState.length > 1) ? newState.splice(indexOfItemInCart, 1) : newState.pop();
      return newState;
  }
}

type UpdateCart = React.Dispatch<React.ReducerAction<CartReducer>>
const GiftList = (): JSX.Element => {
  const [cart, updateCart] = useReducer<CartReducer>(cartReducer, []);

  return (<>
    <Minicart cart={cart} updateCart={updateCart} />
    <div className="p-20 border-t border-joanGreen-500 text-joanGreen-500 selection:bg-joanGreen-500 selection:text-white space-y-16">
      <div className="font-serif text-4xl text-center">Dê seu presente</div>
      <div className="grid pt-[1px] pr-[1px] grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))]">
        {giftList.map((gift, index) =>
        <Gift key={index} updateCart={updateCart} name={gift.name} price={gift.price} image={gift.image}/>)
        }
      </div>
    </div>
  </>)
}

export default GiftList;
