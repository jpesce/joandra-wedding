import { useState } from "react";
import { useCart } from "./CartContext";

const ITEM_NAME = "Valor personalizado";

const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setPayWhaYouWantValue: SetPayWhatYouWantValue
): void => {
  const numbersInValue = event.target.value.replace(/\D/g, "");
  const integerValue = parseInt(numbersInValue) ? parseInt(numbersInValue) : 0;
  setPayWhaYouWantValue(integerValue);

  const stringValue = integerValue > 0 ? integerValue.toString() : "";
  event.target.value = `R$ ${stringValue}`;
};

const PayWhatYouWant = (): JSX.Element => {
  const [payWhatYouWantValue, setPayWhatYouWantValue] = useState(0);
  const { updateCart } = useCart();

  const addItemToCart = (): void => {
    if (!payWhatYouWantValue || payWhatYouWantValue === 0) return;

    updateCart({ type: "removeItem", item: ITEM_NAME });
    updateCart({
      type: "increaseItemQuantity",
      item: ITEM_NAME,
      price: payWhatYouWantValue,
    });
  };

  return (
    <div className="mr-[-1px] mt-[-1px] flex flex-col place-items-center border border-joanGreen-600  bg-joanGreen-50 p-4 text-sm md:h-auto">
      <div className="flex grow flex-col justify-center py-16 md:py-0">
        <p className="text-center font-serif text-3xl">Dê o seu valor</p>
        <p className="text-center">Digite o valor do seu presente</p>
        <div>
          <input
            defaultValue="R$ "
            maxLength={8}
            className="m-auto mt-4 flex w-full items-center rounded-full bg-white py-[0.75rem] text-center text-xl"
            onChange={(event) =>
              handleInputChange(event, setPayWhatYouWantValue)
            }
            onKeyDown={(event) => {
              event.key === "Enter" && addItemToCart();
            }}
          />
        </div>
      </div>
      <button
        onClick={() => {
          addItemToCart();
        }}
        className="mt-4 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-joanGreen-600 bg-white px-5 uppercase text-joanGreen-600 transition hover:bg-joanGreen-600 hover:text-white"
      >
        Presentear
      </button>
    </div>
  );
};

export default PayWhatYouWant;
