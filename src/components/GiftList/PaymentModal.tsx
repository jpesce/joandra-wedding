import { useState, useEffect } from "react";
import Image from "next/image";
import { QrCodePix as PixQRCode } from "qrcode-pix";

import IconX from "../../../public/icon-x.react.svg";
import { useCart } from "./CartContext";

import giftList from "./data";

const Loading = (): JSX.Element => {
  return (
    <div className="flex h-full w-full items-center justify-center md:h-[19.25rem] md:w-[42.125rem]">
      <div className="absolute h-10 w-10 animate-ping rounded-full bg-joanGreen-600"></div>
      <div className="h-10 w-10 rounded-full bg-joanGreen-600"></div>
    </div>
  );
};

type PaymentInfoProps = {
  pixQRCode: { payload: string; base64Image: string };
  paymentLink: string;
};
const PaymentInfo = ({
  pixQRCode,
  paymentLink,
}: PaymentInfoProps): JSX.Element => {
  return (
    <div className="flex max-w-[32rem] flex-col items-center p-10 pt-20 md:max-w-[none] md:flex-row md:space-x-10 md:p-12">
      <div className="order-1 mt-8 flex flex-col md:order-none md:m-0">
        {pixQRCode && (
          <>
            <Image
              src={pixQRCode.base64Image}
              alt="QR code para pagamento via Pix"
              width={200}
              height={200}
              style={{ imageRendering: "pixelated" }}
              className="scale-[1.161] md:hidden"
            />
            <div className="hidden h-[250px] w-[250px] overflow-hidden md:block">
              <Image
                src={pixQRCode.base64Image}
                alt="QR code para pagamento via Pix"
                width={275}
                height={275}
                style={{ imageRendering: "pixelated" }}
                className="scale-[1.161]"
              />
            </div>
          </>
        )}
        <div className="mt-6 flex rounded-full border border-joanGreen-600">
          <input
            size={1}
            className="grow text-ellipsis rounded-l-full py-[0.375rem] pl-4 pr-2 text-sm focus:bg-joanGreen-50 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={pixQRCode.payload}
            readOnly
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
      <div className="space-y-8 text-sm md:w-[24rem]">
        <p className="text-center font-serif text-2xl tracking-tight md:text-3xl">
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
        <div className="hidden border-t border-joanGreen-600 pt-6 md:block">
          <p className="px-6 text-center">
            Se não puder pagar pelo Pix, você também pode{" "}
            <a
              href={paymentLink}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-[0.25em] hover:text-joanGreen-550"
            >
              clicar aqui e pagar com cartão de crédito pelo Mercado Pago.
            </a>
          </p>
        </div>
      </div>
      <div className="order-2 mt-10 border-t border-joanGreen-600 pt-6 text-sm md:hidden">
        <p className="px-6 text-center">
          Se não puder pagar pelo Pix, você também pode{" "}
          <a
            href={paymentLink}
            className="underline underline-offset-[0.25em] hover:text-joanGreen-550"
          >
            clicar aqui e pagar com cartão de crédito pelo Mercado Pago.
          </a>
        </p>
      </div>
    </div>
  );
};

type PixQRCode = (
  amount: number
) => Promise<{ payload: string; base64Image: string }>;
const getPixQRCode: PixQRCode = async (amount) => {
  const pixQRCode = PixQRCode({
    version: "01",
    key: "08974515628",
    name: "João Paulo Barros Cotta Pesce",
    city: "BELO HORIZONTE",
    message: "🎁 Presente de casamento Chandra & João",
    value: amount,
  });
  const base64Image = await pixQRCode.base64();
  const payload = pixQRCode.payload();

  return { payload, base64Image };
};

const paymentLinkCache: PaymentLinkCache = {};
type PaymentLinkCache = {
  [key: string]: string;
};
type PaymentModalProps = {
  setPaymentOpen: SetPaymentOpen;
};
const PaymentModal = ({ setPaymentOpen }: PaymentModalProps): JSX.Element => {
  const [pixQRCode, setPixQRCode] = useState({ payload: "", base64Image: "" });
  const [paymentLink, setPaymentLink] = useState("");
  const [loading, setLoading] = useState(true);

  const { cart, cartTotalAmount } = useCart();

  useEffect(() => {
    (async () => {
      const { payload, base64Image } = await getPixQRCode(cartTotalAmount);
      setPixQRCode({ payload, base64Image });
    })();

    const abortController = new AbortController();
    (async () => {
      const cartCacheKey = JSON.stringify(cart);
      const cartPaymentLinkCache = paymentLinkCache[cartCacheKey];

      if (cartPaymentLinkCache) {
        setPaymentLink(cartPaymentLinkCache);
      } else {
        const response = await fetch("/api/paymentlink", {
          signal: abortController.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart.items.map((item) => {
              return {
                title: item.name,
                unit_price: giftList.find((gift) => gift.name === item.name)
                  ?.price,
                quantity: item.quantity,
              };
            }),
          }),
        });
        const cartCacheKey = JSON.stringify(cart);
        const responseText = await response.text();

        paymentLinkCache[cartCacheKey] = responseText;

        setPaymentLink(responseText);
      }

      setLoading(false);

      return () => abortController.abort();
    })();
  }, [cart, cartTotalAmount]);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-end justify-center bg-black bg-opacity-60 text-joanGreen-600 md:items-center"
      onClick={() => setPaymentOpen(false)}
    >
      <div
        className="relative flex h-full w-screen animate-fade-in-up items-center justify-center overflow-y-auto bg-white selection:bg-joanGreen-600 selection:text-white md:h-auto md:w-auto md:rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="fixed top-2 right-2 flex items-center justify-center rounded-full bg-white p-2 hover:bg-joanGreen-50 md:absolute"
          onClick={() => setPaymentOpen(false)}
        >
          <IconX className="h-[28px]" />
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
