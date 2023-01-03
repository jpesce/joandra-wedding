import Image from "next/image";
import eventPhoto from "../../../public/event.jpg";

interface EventInformationItemProps {
  name: string;
  children: JSX.Element | string;
  action?: {
    label: string;
    href: string;
  };
}
const EventInformationItem = ({
  name,
  children,
  action,
}: EventInformationItemProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <dt className="font-condensed text-base uppercase tracking-widest">
        {name}
      </dt>
      <dd className="max-w-[32rem] space-x-2 font-serif text-4xl">
        <span>{children}</span>
        {action && (
          <>
            {" "}
            <a
              className="nowrap relative top-[-2px] mt-2 block w-fit select-none whitespace-nowrap rounded-full border border-joanGreen-600 py-[0.25rem] px-[0.75rem] align-middle font-sans text-sm hover:bg-joanGreen-600 hover:text-white lg:mt-0 lg:inline"
              href={action.href}
              target="_blank"
              rel="noreferrer"
            >
              {action.label}
            </a>
          </>
        )}
      </dd>
    </div>
  );
};

const EventDetails = (): JSX.Element => {
  return (
    <div className="flex flex-col selection:bg-joanGreen-600 selection:text-white lg:flex-row">
      <div className="relative order-1 basis-1/2 border-t border-joanGreen-600 lg:order-none lg:border-r">
        <Image
          src={eventPhoto}
          alt="Melvin Sokolsky - Sidekick, Harper's Bazaar"
          className="h-full w-full select-none object-cover"
        />
      </div>
      <div className="basis-1/2 px-8 py-10 text-joanGreen-600 lg:p-20">
        <dl className="flex flex-col space-y-10 lg:space-y-8">
          <EventInformationItem
            name="Que dia?"
            action={{
              href: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=MzFkaXA4MnFqZHFmOGgwNmxxM2J0ZmswOGMganBlc2NlQG0&tmsrc=jpesce%40gmail.com",
              label: "Google Calendar ＋",
            }}
          >
            Sábado, cinco de agosto de dois mil e vinte e três
          </EventInformationItem>
          <EventInformationItem name="Que horas?">
            Três da tarde
          </EventInformationItem>
          <EventInformationItem
            name="Onde?"
            action={{
              href: "https://goo.gl/maps/i56RHKW5uLg1YMg78",
              label: "Google Maps ↗",
            }}
          >
            <address className="inline not-italic">
              Av. Professor Clóvis Salgado, 1485 — Bandeirantes, BH/MG
            </address>
          </EventInformationItem>
        </dl>
      </div>
    </div>
  );
};

export default EventDetails;
