const Hero = (): JSX.Element => {
  return (
    <div
      id="hero"
      className="relative h-screen min-h-[32rem] bg-joanGreen-600 selection:bg-white selection:text-joanGreen-600"
    >
      <div className="absolute bottom-0 left-0 p-8 lg:py-16 lg:px-12">
        <div className="mb-8 font-serif text-6xl text-white lg:max-w-2xl lg:text-7xl">
          <span className="italic">Chandra & João</span> vão finalmente fazer
          dessa união uma festa.
        </div>
        <a
          href="#lista-de-presentes"
          className="mr-4 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-white px-5 text-sm uppercase text-white transition hover:bg-white hover:text-joanGreen-600 lg:w-auto"
        >
          Escolher presente
        </a>
        <a
          href="#confirmar-presenca"
          className="mt-2 inline-flex min-h-[2.5rem] w-full select-none items-center justify-center rounded-full border border-white px-5 text-sm uppercase text-white transition hover:bg-white hover:text-joanGreen-600 lg:w-auto"
        >
          Confirmar presença
        </a>
      </div>
    </div>
  );
};

export default Hero;
