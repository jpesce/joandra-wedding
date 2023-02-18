import { useState } from "react";
import Image from "next/image";
import catsHandshaking from "../../../public/cats-handshaking.jpg";
import IconArrowRight from "../../../public/icon-arrow-right.react.svg";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Array<{ value: string; label: string }>;
};
function Select({
  label,
  options,
  ...selectInputProps
}: SelectProps): JSX.Element {
  return (
    <div className="relative inline-block flex h-full h-[3rem] w-full border border-joanGreen-600 focus-within:bg-joanGreen-50">
      <label
        htmlFor={selectInputProps.id}
        className="flex h-full shrink-0 items-center pl-4 pr-2 pt-[0.375rem] font-condensed uppercase tracking-widest"
      >
        {label}
      </label>
      <select
        className="mr-4 w-full text-black focus:bg-joanGreen-50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        name="select"
        {...selectInputProps}
      >
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};
function Input({ label, ...htmlInputProps }: InputProps): JSX.Element {
  return (
    <div className="relative inline-block flex h-full h-[3rem] w-full border border-joanGreen-600 focus-within:bg-joanGreen-50">
      <label
        htmlFor={htmlInputProps.id}
        className="flex h-full shrink-0 items-center pl-4 pr-2 pt-[0.375rem] font-condensed uppercase tracking-widest"
      >
        {label}
      </label>
      <input
        className="h-full w-full bg-transparent pl-2 pr-4 text-black focus:bg-joanGreen-50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        {...htmlInputProps}
      ></input>
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};
function TextArea({ label, ...htmlTextAreaProps }: TextAreaProps): JSX.Element {
  return (
    <div className="relative inline-block flex h-full w-full flex-col border border-joanGreen-600 focus-within:bg-joanGreen-50">
      <label
        htmlFor={htmlTextAreaProps.id}
        className="flex shrink-0 items-center pl-4 pr-2 pt-4 font-condensed uppercase tracking-widest"
      >
        {label}
      </label>
      <textarea
        className="h-full w-full bg-transparent px-4 pb-4 pt-2 text-black focus:bg-joanGreen-50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        {...htmlTextAreaProps}
      ></textarea>
    </div>
  );
}

type ConfirmationMessageProps = {
  setRSVPState: React.Dispatch<React.SetStateAction<RSVPState>>;
};
function ConfirmationMessage({
  setRSVPState,
}: ConfirmationMessageProps): JSX.Element {
  return (
    <div className="flex h-full h-80 w-full grow animate-fade-in flex-col items-center justify-center space-y-4 border border-joanGreen-600 p-6">
      <p>Confirmação enviada com sucesso</p>
      <Image src={catsHandshaking} alt="Cats handshaking" width={200} />
      <button
        className="mt-4 inline-flex min-h-[2.5rem] select-none items-center justify-center rounded-full border border-joanGreen-600 px-5 uppercase text-joanGreen-600 transition hover:bg-joanGreen-600 hover:text-white"
        onClick={() => setRSVPState("formOpen")}
      >
        ← &nbsp;Confirmar outra pessoa
      </button>
    </div>
  );
}

type RSVPFormElements = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  phone: HTMLInputElement;
  confirmation: HTMLSelectElement;
  message: HTMLTextAreaElement;
};
type HTMLRSVPFormElement = HTMLFormElement & {
  readonly elements: RSVPFormElements;
};
type FormData = {
  name: string;
  phone: string;
  confirmation: string;
  message?: string;
};
type ZapierResponse = {
  status: string;
};
type RSVPFormProps = {
  setRSVPState: React.Dispatch<React.SetStateAction<RSVPState>>;
};
function RSVPForm({ setRSVPState }: RSVPFormProps): JSX.Element {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitForm = async (
    url: string,
    formData: FormData
  ): Promise<ZapierResponse> => {
    setSubmitting(true);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      return Promise.reject(
        new Error(
          `Unsuccessful status code when submitting form: ${response.status}`
        )
      );
    }
    const responseJson = await response.json();

    setSubmitting(false);
    return responseJson;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLRSVPFormElement>) => {
    event.preventDefault();

    const formData = {
      name: event.currentTarget.elements.name.value,
      phone: event.currentTarget.elements.phone.value,
      confirmation: event.currentTarget.elements.confirmation.value,
      message: event.currentTarget.elements.message.value,
    };

    const response = await submitForm(event.currentTarget.action, formData);

    if (!response || !response.status || response.status != "success") {
      console.error(
        `Unsuccessful response from form submission. ${JSON.stringify(
          response
        )}`
      );
    }
    if (response && response.status === "success") {
      setRSVPState("confirmed");
    }
  };

  return (
    <form
      action="https://hooks.zapier.com/hooks/catch/778207/b78vzbt/"
      method="post"
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="md:flex">
        <div className="grow basis-1/3 md:-mr-[1px]">
          <Input id="name" name="name" label="Quem é você?" required />
        </div>
        <div className="-mt-[1px] grow basis-1/3 md:mt-0 md:-mr-[1px]">
          <Input
            id="phone"
            name="phone"
            label="Telefone"
            required
            maxLength={18}
          />
        </div>
        <div className="-mt-[1px] grow basis-1/3 md:mt-0">
          <Select
            id="confirmation"
            name="confirmation"
            label="Você vai?"
            options={[
              { value: "sim", label: "Com certeza!" },
              { value: "nao", label: "Infelizmente não" },
            ]}
          />
        </div>
      </div>
      <div className="mt-[-1px]">
        <TextArea
          id="message"
          name="message"
          label="O que é... a vida?"
          rows={4}
        />
      </div>
      {!submitting ? (
        <button
          className="group mt-[-1px] flex h-[3rem] w-full select-none items-center justify-center border border-joanGreen-600 bg-joanGreen-600 px-5 uppercase text-white transition hover:bg-joanGreen-550"
          type="submit"
        >
          <span className="mr-2">Confirmar</span>
          <IconArrowRight className="h-[13px] rotate-[-45deg] transition duration-300 group-hover:rotate-0" />
        </button>
      ) : (
        <button
          className="mt-[-1px] h-[3rem] w-full select-none border border-joanGreen-600 bg-joanGreen-550 px-5 text-slate-400"
          type="submit"
          disabled
        >
          <div className="relative m-auto h-[1.25rem] w-[1.25rem]">
            <div className="absolute h-[1.25rem] w-[1.25rem] rounded-full bg-white opacity-80"></div>
            <div className="m-auto h-[1.25rem] w-[1.25rem] animate-ping rounded-full bg-white"></div>
          </div>
        </button>
      )}
    </form>
  );
}

type RSVPState = "formOpen" | "confirmed";
function RSVP(): JSX.Element {
  const [state, setState] = useState<RSVPState>("formOpen");

  return (
    <div className="flex min-h-[33rem] flex-col items-center space-y-16 border-t border-joanGreen-600 px-8 py-10 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white md:min-h-[32.625rem] lg:p-20">
      <div className="max-w-lg space-y-2 text-center">
        <div className="font-serif text-4xl">Confirme sua presença</div>
        <div>
          Pra planejar tudo melhor, é muito importante pra gente saber quem vai
          e quem não vai conseguir ir o mais cedo possível. Ah, cada confirmação
          é individual, então se for mais de uma pessoa, confirme cada uma
          separadamente. E claro, todos os nomes precisam estar na nossa lista,
          não dê uma de engraçadinho 👀
        </div>
      </div>
      {state === "confirmed" && <ConfirmationMessage setRSVPState={setState} />}
      {state === "formOpen" && <RSVPForm setRSVPState={setState} />}
    </div>
  );
}

export default RSVP;
