import type { FC } from "react";

import Button from '../Button';

const Hero: FC = () => {
  return (
    <div className="h-screen bg-joanGreen-500 min-h-[32rem] relative selection:bg-white selection:text-joanGreen-500">
      <div className="absolute bottom-16 left-12">
        <div className="font-serif text-white text-7xl max-w-2xl mb-8">
          <span className="italic">Chandra & João</span> vão finalmente fazer dessa união uma festa.
        </div>
        <div className="space-x-4">
          <Button label="Escolher presente" href="#lista-de-presentes"/>
          <Button label="Confirmar presença" href="#confirmar-presenca"/>
        </div>
      </div>
    </div>
  )
}

export default Hero
