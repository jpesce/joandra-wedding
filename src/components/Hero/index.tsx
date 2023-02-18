type HeroProps = {
  text: JSX.Element | string;
  actions: {
    label: string;
    href: string;
  }[];
};
function Hero({ text, actions }: HeroProps): JSX.Element {
  return (
    <div
      id="hero"
      className="relative h-[calc(100vh-6rem)] min-h-[32rem] bg-joanGreen-600 selection:bg-white selection:text-joanGreen-600 lg:h-screen"
    >
      <div className="absolute bottom-0 left-0 p-8 lg:py-16 lg:px-12">
        <div className="mb-8 font-serif text-[12vw] leading-none text-white lg:max-w-2xl lg:text-7xl">
          {text}
        </div>
        {actions.map((action, index) => (
          <a
            key={`${index}${action.href}${action.label}`}
            href={action.href}
            className="mr-4 mt-2 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-white px-5 text-sm uppercase text-white transition hover:bg-white hover:text-joanGreen-600 md:mt-0 md:w-auto"
          >
            {action.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Hero;
