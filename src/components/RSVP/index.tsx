import { useState } from "react";
import Image from "next/image";
import catsHandshaking from "../../../public/cats-handshaking.jpg";
import IconArrowRight from "../../../public/icon-arrow-right.react.svg";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
const Input = ({ label, ...htmlInputProps }: InputProps): JSX.Element => {
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
};

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
const TextArea = ({
  label,
  ...htmlTextAreaProps
}: TextAreaProps): JSX.Element => {
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
};

const ConfirmationMessage = (): JSX.Element => {
  return (
    <div className="flex h-full grow animate-fade-in flex-col items-center justify-center space-y-4 uppercase">
      <p>Confirmação feita</p>
      <Image src={catsHandshaking} alt="Cats handshaking" width={200} />
      <p>com sucesso</p>
    </div>
  );
};

interface RSVPFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  numberOfPersons: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface HTMLRSVPFormElement extends HTMLFormElement {
  readonly elements: RSVPFormElements;
}
const RSVPForm = ({
  setRSVPState,
}: {
  setRSVPState: React.Dispatch<React.SetStateAction<RSVPState>>;
}): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);

  interface FormData {
    name: string;
    "number-of-persons": string;
    message?: string;
  }
  interface ZapierResponse {
    status: string;
  }
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
      "number-of-persons": event.currentTarget.elements.numberOfPersons.value,
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
    >
      <div className="flex">
        <div className="mr-[-1px] grow">
          <Input id="name" name="name" label="Quem é você?" required />
        </div>
        <div className="grow">
          <Input
            id="numberOfPersons"
            name="number-of-persons"
            label="Vem em quantos?"
            type="number"
            min="1"
            max="10"
            required
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
};

type RSVPState = "formOpen" | "confirmed";
const RSVP = (): JSX.Element => {
  const [state, setState] = useState<RSVPState>("formOpen");

  return (
    <div className="flex min-h-[32.625rem] flex-col space-y-16 border-t border-joanGreen-600 p-20 text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white">
      <div className="text-center font-serif text-4xl">
        Confirme sua presença
      </div>
      {state === "confirmed" && <ConfirmationMessage />}
      {state === "formOpen" && <RSVPForm setRSVPState={setState} />}
    </div>
  );
};

export default RSVP;
