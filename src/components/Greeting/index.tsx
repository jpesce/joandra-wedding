import Image from "next/image";
import chandraEJoao from "../../../public/chandra-e-joao-na-toca.jpg";
import Signatures from "../../../public/signatures.react.svg";

function Intro(): JSX.Element {
  return (
    <div className="flex justify-center border-t border-joanGreen-600 py-10 px-8 text-left text-joanGreen-600 selection:bg-joanGreen-600 selection:text-white lg:py-20">
      <div className="max-w-[36rem]">
        <p>
          Depois de anos comemorando todos os dias entre nós, decidimos levar
          essa festa para as pessoas mais especiais ao nosso redor. Pensamos e
          preparamos um momento pra traduzir a gente nesse dia, e é com muita
          alegria mesmo que a gente te chama pra fazer parte dele.
        </p>
        <p className="mt-6">
          Como qualquer festa nossa, espere uma mesa de antepastos recheada, no
          melhor esquema cada um por si, com um pouco de tudo. Bebidas, drinks
          do nosso bar preferido em BH, muita música e um jantar pra fechar com
          chave de ouro. Se vista pra esse dia único e venha pronto pra
          aproveitar muito do nosso lado!
        </p>
        <div className="relative m-auto mt-12 max-w-[432px]">
          <Image
            src={chandraEJoao}
            alt="Chandra e João, por Guilherme Garofalo"
            title="Chandra e João, por Guilherme Garofalo"
            sizes="(max-width: 496px) 100vw - 64px, 432px"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <Signatures className="m-auto mt-6 h-12 max-w-full text-black lg:h-14" />
      </div>
    </div>
  );
}

export default Intro;
