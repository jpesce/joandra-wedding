import { useState, useEffect } from "react";
import Image from "next/image";
import { QrCodePix as PixQRCode } from "qrcode-pix";

import IconX from "../../../public/icon-x.react.svg";

import { cartTotalAmount } from "./cartUtils";
import giftList from "./data";

const Loading = (): JSX.Element => {
  return (
    <div className="w-[42.125rem] h-[19.25rem] flex justify-center items-center">
      <div className="absolute w-10 h-10 bg-joanGreen-600 rounded-full animate-ping"></div>
      <div className="w-10 h-10 bg-joanGreen-600 rounded-full"></div>
    </div>
  )
}

interface PaymentInfoProps {
  pixQRCode: { payload: string, base64Image: string };
  paymentLink: string;
}
const PaymentInfo = ({ pixQRCode, paymentLink }: PaymentInfoProps): JSX.Element => {
  return (
    <div className="flex space-x-10 items-center">
      <div className="flex flex-col">
        {pixQRCode && (
          <div className="w-[250px] h-[250px] overflow-hidden">
            <Image
              src={pixQRCode.base64Image}
              alt="QR code para pagamento via Pix"
              width={275}
              height={275}
              style={{ imageRendering: "pixelated" }}
              className="scale-[1.161]"
            />
          </div>
        )}
        <div className="flex mt-6 rounded-full border border-joanGreen-600">
          <input size={1} className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:bg-joanGreen-50 grow pl-4 pr-2 py-[0.375rem] text-ellipsis rounded-l-full text-sm" value={pixQRCode.payload} onFocus={(event) => {
              navigator.clipboard.writeText(pixQRCode.payload);
              event.target.select();
            }}/>
          <button className="flex pl-[0.75rem] border-l border-joanGreen-600 pr-4 items-center hover:bg-joanGreen-50 rounded-r-full active:bg-joanGreen-600 active:text-white text-sm" onClick={ () => navigator.clipboard.writeText(pixQRCode.payload) }>Copiar</button>
        </div>
      </div>
      <div className="w-[24rem] text-sm space-y-8">
        <p className="font-serif text-3xl text-center tracking-tight">O pagamento pelo Pix é melhor pra gente e não tem taxas :)</p>
        <div className="flex space-x-6 px-2">
          <div className="flex flex-1 flex-col items-center text-center space-y-2">
            <div className="h-6 w-6 flex justify-center items-center rounded-full border border-joanGreen-600 text-xs select-none">1</div>
            <p>Abra o app do seu banco, entre na opção Pix</p>
          </div>
          <div className="flex flex-1 flex-col items-center text-center space-y-2">
            <div className="h-6 w-6 flex justify-center items-center rounded-full border border-joanGreen-600 text-xs select-none">2</div>
            <p>Faça a leitura do QR code, ou copie e cole o código</p>
          </div>
        </div>
        <div className="pt-6 border-t border-joanGreen-600">
          <p className="px-6 text-center">
            Se não puder pagar pelo Pix, você também pode{" "}
            <a href={paymentLink} className="underline hover:text-joanGreen-550 underline-offset-[0.25em]" target="_blank" rel="noreferrer" >
              clicar aqui e pagar com cartão de crédito pelo Mercado Pago.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

interface PaymentModalProps {
  cart: Cart;
  setPaymentOpen: SetPaymentOpen;
}
const PaymentModal = ({
  cart,
  setPaymentOpen,
}: PaymentModalProps): JSX.Element => {
  const [pixQRCode, setPixQRCode] = useState({ payload: "", base64Image: "" });
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(true);

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
      const pixQRCodeBase64Image = await pixQRCodeInfo.base64();

      setPixQRCode({
        payload: pixQRCodeInfo.payload(),
        base64Image: pixQRCodeBase64Image
      });
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
      setLoading(false);

      return () => abortController.abort();
    })();
  }, [cart]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-joanGreen-600" onClick={() => setPaymentOpen(false)}>
      <div className="rounded-lg bg-white p-12 relative selection:bg-joanGreen-600 selection:text-white" onClick={(event) => event.stopPropagation()}>
        <button className="absolute top-2 right-2 p-2 flex items-center justify-center rounded-full hover:bg-joanGreen-50" onClick={() => setPaymentOpen(false)}>
          <IconX className="h-[24px]" />
        </button>
        {loading ?
          <Loading /> :
          <PaymentInfo pixQRCode={pixQRCode} paymentLink={paymentLink} />}
      </div>
    </div>
  );
};

export default PaymentModal
