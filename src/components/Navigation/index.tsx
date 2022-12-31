import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/chandra-e-joao.svg";

const Navigation = (): JSX.Element => {
  const [textClass, setTextClass] = useState(
    "text-white selection:bg-white selection:text-joanGreen-600"
  );
  const [animation, setAnimation] = useState("animate-wiggle");

  const scrollListener = () => {
    if (window.scrollY < window.innerHeight - 63) {
      setTextClass(
        "text-white selection:bg-white selection:text-joanGreen-600"
      );
    } else {
      setTextClass("text-black selection:bg-black selection:text-white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, []);

  return (
    <>
      <a
        href="#hero"
        onMouseEnter={() => setAnimation("animate-wiggle")}
        onAnimationEnd={() => setAnimation("")}
        className={`fixed top-8 left-12 z-40 w-[7rem] ${animation}`}
      >
        <Image
          src={logo}
          alt="Chandra e João"
          className="select-none"
          priority={true}
        />
      </a>
      <nav className={`fixed top-14 right-20 space-x-8 ${textClass} z-40`}>
        <a href="#a-festa">A festa</a>
        <a href="#lista-de-presentes">Lista de presentes</a>
        <a href="#confirmar-presenca">Confirmar presença</a>
        <a href="#perguntas-frequentes">Perguntas frequentes</a>
      </nav>
    </>
  );
};

export default Navigation;
