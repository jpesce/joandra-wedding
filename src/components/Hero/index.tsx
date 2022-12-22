const Hero = (): JSX.Element => {
  return (
    <div className="h-screen bg-joanGreen-500 min-h-[32rem] relative selection:bg-white selection:text-joanGreen-500">
      <div className="absolute bottom-16 left-12">
        <div className="font-serif text-white text-7xl max-w-2xl mb-8">
          <span className="italic">Chandra & João</span> vão finalmente fazer dessa união uma festa.
        </div>
        <div className="space-x-4">
          <a href="#lista-de-presentes" className="min-h-[2.5rem] px-5 transition select-none text-white border border-white rounded-full hover:text-joanGreen-500 hover:bg-white inline-flex items-center">Escolher presente</a>
          <a href="#confirmar-presenca" className="min-h-[2.5rem] px-5 transition select-none text-white border border-white rounded-full hover:text-joanGreen-500 hover:bg-white inline-flex items-center">Confirmar presença</a>
        </div>
      </div>
    </div>
  )
}

export default Hero
