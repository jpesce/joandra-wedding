import { useState } from 'react';
import Image from 'next/image'
import catsHandshaking from '../../../public/cats-handshaking.jpg'
import arrowRight from '../../../public/arrow-right.svg'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
}
const Input = ({ label, ...htmlInputProps }: InputProps): JSX.Element => {
  return (
    <div className="relative inline-block w-full h-full border border-joanGreen-500 flex h-[3rem] focus-within:bg-[#E7F9EF]">
      <label htmlFor={htmlInputProps.id} className="font-condensed uppercase tracking-widest shrink-0 pl-4 pr-2 h-full flex items-center pt-[0.375rem]">{label}</label>
      <input className="w-full h-full text-black pl-2 pr-4 focus:outline-none bg-transparent" {...htmlInputProps}></input>
    </div>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string,
}
const TextArea = ({ label, ...htmlTextAreaProps }: TextAreaProps): JSX.Element => {
  return (
    <div className="relative inline-block w-full h-full border border-joanGreen-500 flex flex-col focus-within:bg-[#E7F9EF]">
      <label htmlFor={htmlTextAreaProps.id} className="font-condensed uppercase tracking-widest shrink-0 pl-4 pr-2 flex items-center pt-4">{label}</label>
      <textarea className="px-4 pb-4 pt-2 w-full h-full text-black focus:outline-none bg-transparent" {...htmlTextAreaProps}></textarea>
    </div>
  )
}

const ConfirmationMessage = (): JSX.Element => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-full grow animate-fade-in uppercase">
      <p>Confirmação feita</p>
      <Image src={catsHandshaking} alt="Cats handshaking" width={200} />
      <p>com sucesso</p>
    </div>
  )
}

interface RSVPFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  numberOfPersons: HTMLInputElement;
  message: HTMLTextAreaElement;
}
interface HTMLRSVPFormElement extends HTMLFormElement {
  readonly elements: RSVPFormElements;
}
const RSVPForm = ({ setRSVPState }: { setRSVPState: React.Dispatch<React.SetStateAction<RSVPState>> }): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);

  interface FormData {
    "name": string,
    "number-of-persons": string,
    "message"?: string
  }
  interface ZapierResponse {
    "status": string
  }
  const submitForm = async (url: string, formData: FormData): Promise<ZapierResponse> => {
    setSubmitting(true);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData)
    });

    if(!response.ok) {
      return Promise.reject(new Error(`Unsuccessful status code when submitting form: ${response.status}`));
    }
    const responseJson = await response.json();

    setSubmitting(false);
    return responseJson;
  }

  const handleSubmit = async(event: React.FormEvent<HTMLRSVPFormElement>) => {
    event.preventDefault();

    const formData = {
      "name": event.currentTarget.elements.name.value,
      "number-of-persons": event.currentTarget.elements.numberOfPersons.value,
      "message": event.currentTarget.elements.message.value
    };

    const response = await submitForm(event.currentTarget.action, formData);

    if(!response || !response.status || response.status != "success") {
      console.error(`Unsuccessful response from form submission. ${JSON.stringify(response)}`);
    }
    if(response && response.status === "success") {
      setRSVPState("confirmed");
    }
  }

  return (
    <form action="https://hooks.zapier.com/hooks/catch/778207/b78vzbt/" method="post" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="grow mr-[-1px]">
          <Input id="name" name="name" label="Quem é você?" required />
        </div>
        <div className="grow">
          <Input id="numberOfPersons" name="number-of-persons" label="Vem em quantos?" type="number" min="1" max="10" required />
        </div>
      </div>
      <div className="mt-[-1px]">
        <TextArea id="message" name="message" label="O que é... a vida?" rows={4}/>
      </div>
      {!submitting ?
        <button className="h-[3rem] px-5 transition select-none text-white bg-joanGreen-500 border border-joanGreen-500 hover:bg-[#33FF91] w-full mt-[-1px] uppercase flex items-center justify-center group" type="submit">
          <span className="mr-2">Confirmar</span>
          <Image src={arrowRight} alt="Right arrow" className="rotate-[-45deg] group-hover:rotate-0 transition duration-300"/>
        </button>
        :
        <button className="h-[3rem] px-5 select-none bg-[#33FF91] border border-joanGreen-500 text-slate-400 w-full mt-[-1px]" type="submit" disabled>
          <div className="m-auto relative h-[1.25rem] w-[1.25rem]">
            <div className="absolute rounded-full bg-white h-[1.25rem] w-[1.25rem] opacity-80"></div>
            <div className="rounded-full h-[1.25rem] w-[1.25rem] bg-white animate-ping m-auto"></div>
          </div>
        </button>
      }
    </form>
  )
}

type RSVPState = "formOpen" | "confirmed"
const RSVP = (): JSX.Element => {
  const [state, setState] = useState<RSVPState>("formOpen");

  return (
    <div className="p-20 border-t border-joanGreen-500 text-joanGreen-500 selection:bg-joanGreen-500 selection:text-white space-y-16 min-h-[32.625rem] flex flex-col">
      <div className="font-serif text-4xl text-center">Confirme sua presença</div>
      {(state==="confirmed") && <ConfirmationMessage />}
      {(state==="formOpen") && <RSVPForm setRSVPState={setState} />}
    </div>
  )
}

export default RSVP
