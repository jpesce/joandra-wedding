import { useState, useEffect } from "react";
import Image from "next/image";
import { QrCodePix as PixQRCode } from "qrcode-pix";

import IconX from "../../../public/icon-x.react.svg";

import { cartTotalAmount } from "./cartUtils";
import giftList from "./data";

const Loading = (): JSX.Element => {
  return (
    <div className="flex h-[19.25rem] w-[42.125rem] items-center justify-center">
      <div className="absolute h-10 w-10 animate-ping rounded-full bg-joanGreen-600"></div>
      <div className="h-10 w-10 rounded-full bg-joanGreen-600"></div>
    </div>
  );
};

interface PaymentInfoProps {
  pixQRCode: { payload: string; base64Image: string };
  paymentLink: string;
}
const PaymentInfo = ({
  pixQRCode,
  paymentLink,
}: PaymentInfoProps): JSX.Element => {
  return (
    <div className="flex items-center space-x-10">
      <div className="flex flex-col">
        {pixQRCode && (
          <div className="h-[250px] w-[250px] overflow-hidden">
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
        <div className="mt-6 flex rounded-full border border-joanGreen-600">
          <input
            size={1}
            className="grow text-ellipsis rounded-l-full py-[0.375rem] pl-4 pr-2 text-sm focus:bg-joanGreen-50 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={pixQRCode.payload}
            onFocus={(event) => {
              navigator.clipboard.writeText(pixQRCode.payload);
              event.target.select();
            }}
          />
          <button
            className="flex items-center rounded-r-full border-l border-joanGreen-600 pl-[0.75rem] pr-4 text-sm hover:bg-joanGreen-50 active:bg-joanGreen-600 active:text-white"
            onClick={() => navigator.clipboard.writeText(pixQRCode.payload)}
          >
            Copiar
          </button>
        </div>
      </div>
      <div className="w-[24rem] space-y-8 text-sm">
        <p className="text-center font-serif text-3xl tracking-tight">
          O pagamento pelo Pix é melhor pra gente e não tem taxas :)
        </p>
        <div className="flex space-x-6 px-2">
          <div className="flex flex-1 flex-col items-center space-y-2 text-center">
            <div className="flex h-6 w-6 select-none items-center justify-center rounded-full border border-joanGreen-600 text-xs">
              1
            </div>
            <p>Abra o app do seu banco, entre na opção Pix</p>
          </div>
          <div className="flex flex-1 flex-col items-center space-y-2 text-center">
            <div className="flex h-6 w-6 select-none items-center justify-center rounded-full border border-joanGreen-600 text-xs">
              2
            </div>
            <p>Faça a leitura do QR code, ou copie e cole o código</p>
          </div>
        </div>
        <div className="border-t border-joanGreen-600 pt-6">
          <p className="px-6 text-center">
            Se não puder pagar pelo Pix, você também pode{" "}
            <a
              href={paymentLink}
              className="underline underline-offset-[0.25em] hover:text-joanGreen-550"
              target="_blank"
              rel="noreferrer"
            >
              clicar aqui e pagar com cartão de crédito pelo Mercado Pago.
            </a>
          </p>
        </div>
      </div>
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
        base64Image: pixQRCodeBase64Image,
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
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-joanGreen-600"
      onClick={() => setPaymentOpen(false)}
    >
      <div
        className="relative rounded-lg bg-white p-12 selection:bg-joanGreen-600 selection:text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 flex items-center justify-center rounded-full p-2 hover:bg-joanGreen-50"
          onClick={() => setPaymentOpen(false)}
        >
          <IconX className="h-[24px]" />
        </button>
        {loading ? (
          <Loading />
        ) : (
          <PaymentInfo pixQRCode={pixQRCode} paymentLink={paymentLink} />
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
