import Signatures from "../../../public/signatures.react.svg";

const Intro = (): JSX.Element => {
  return (
    <div className="flex justify-center border-t border-joanGreen-600 py-10 px-8 uppercase text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white lg:py-20">
      <div className="max-w-[36rem] space-y-6">
        <p>
          Depois de anos comemorando todos os dias entre nós, decidimos levar
          essa festa para as pessoas mais especiais ao nosso redor. Pensamos e
          preparamos um momento pra traduzir a gente nesse dia, e é com muita
          alegria mesmo que a gente te chama pra fazer parte dele.
        </p>
        <p>
          Como qualquer festa nossa, espere uma mesa de antepastos recheada, no
          melhor esquema cada um por si, com um pouco de tudo. Bebidas, drinks
          do nosso bar preferido em BH, muita música e um jantar pra fechar com
          chave de ouro. Se vista pra esse dia único e venha pronto pra
          aproveitar muito do nosso lado!
        </p>
        <Signatures className="m-auto h-12 max-w-full text-black lg:h-14" />
      </div>
    </div>
  );
};

export default Intro;
