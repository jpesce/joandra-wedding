import Image from "next/image";
import eventPhoto from "../../../public/event.jpg";

interface EventInformationProps {
  name: string;
  children: JSX.Element | string;
}
const EventInformation = ({
  name,
  children,
}: EventInformationProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <dt className="font-condensed text-base uppercase tracking-widest">
        {name}
      </dt>
      <dd className="max-w-[32rem] font-serif text-4xl">{children}</dd>
    </div>
  );
};

const EventDetails = (): JSX.Element => {
  return (
    <div className="flex selection:bg-joanGreen-600 selection:text-white">
      <div className="relative basis-1/2 border-r border-joanGreen-600">
        <Image
          src={eventPhoto}
          alt="Chandra e João sorrindo"
          className="h-full w-full select-none object-cover"
        />
      </div>
      <div className="basis-1/2 px-16 py-20 text-joanGreen-600">
        <dl className="flex flex-col space-y-8">
          <EventInformation name="Que dia?">
            <>
              Sábado, cinco de agosto de dois mil e vinte e três
              <a
                className="nowrap relative top-[-2px] ml-4 select-none whitespace-nowrap rounded-full border border-joanGreen-600 py-[0.25rem] px-[0.75rem] align-middle font-sans text-sm hover:bg-joanGreen-600 hover:text-white"
                href="https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MzFkaXA4MnFqZHFmOGgwNmxxM2J0ZmswOGMganBlc2NlQG0&tmsrc=jpesce%40gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                Google Calendar ＋
              </a>
            </>
          </EventInformation>
          <EventInformation name="Que horas?">Três da tarde</EventInformation>
          <EventInformation name="Onde?">
            <address className="not-italic">
              Av. Professor Clóvis Salgado, 1485 — Bandeirantes, BH/MG
              <a
                className="nowrap relative top-[-2px] ml-4 select-none whitespace-nowrap rounded-full border border-joanGreen-600 py-[0.25rem] px-[0.75rem] align-middle font-sans text-sm hover:bg-joanGreen-600 hover:text-white"
                href="https://goo.gl/maps/i56RHKW5uLg1YMg78"
                target="_blank"
                rel="noreferrer"
              >
                Google Maps ↗
              </a>
            </address>
          </EventInformation>
        </dl>
      </div>
    </div>
  );
};

export default EventDetails;
