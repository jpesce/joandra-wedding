import Image from "next/image";

import Minicart from "./Minicart";
import PayWhatYouWant from "./PayWhatYouWant";
import { useCart } from "./CartContext";

import giftList from "./data";

type GiftProps = {
  name: string;
  price: number;
  image: string;
};
function Gift({ name, price, image }: GiftProps): JSX.Element {
  const { updateCart } = useCart();

  return (
    <div
      onClick={() => {
        updateCart({ type: "increaseItemQuantity", item: name });
      }}
      className="group mr-[-1px] mt-[-1px] cursor-pointer border-y border-joanGreen-600 bg-white p-4 text-sm uppercase md:border"
    >
      <div className="flex">
        <div className="flex-grow text-left">{name}</div>
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
        onClick={(event) => {
          event.stopPropagation();
          updateCart({ type: "increaseItemQuantity", item: name });
        }}
        className="mt-4 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-joanGreen-600 px-5 uppercase text-joanGreen-600 transition group-hover:bg-joanGreen-600 group-hover:text-white"
      >
        Presentear
      </button>
    </div>
  );
}

function GiftList(): JSX.Element {
  return (
    <>
      <Minicart />
      <div className="space-y-16 border-t border-joanGreen-600 py-10 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white md:px-8 lg:p-20">
        <div className="m-auto max-w-2xl space-y-2 px-8 text-center">
          <div className="font-serif text-4xl">Dê seu presente</div>
          <div>
            Clique para selecionar o(s) presente(s) que você quer nos dar. Ao
            final você pode pagar com Pix ou cartão. Vamos agradecer demais sua
            escolha! Qualquer dificuldade, é só falar com a gente que te
            ajudamos.
          </div>
        </div>
        <div className="grid grid-cols-1 pt-[1px] pr-[1px] md:grid-cols-[repeat(auto-fill,_minmax(19rem,_1fr))]">
          {giftList.map((gift, index) => (
            <Gift
              key={index}
              name={gift.name}
              price={gift.price}
              image={gift.image}
            />
          ))}
          <PayWhatYouWant />
        </div>
      </div>
    </>
  );
}

export default GiftList;
