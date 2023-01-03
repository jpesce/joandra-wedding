import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/chandra-e-joao.svg";

type Background = "dark" | "light";
type SetBackground = React.Dispatch<React.SetStateAction<Background>>;
const setCurrentBackground = (setBackground: SetBackground) => {
  const heroBottom = document
    .getElementById("hero")
    ?.getBoundingClientRect().bottom;
  const mainNavBottom = document
    .getElementById("main-nav")
    ?.getBoundingClientRect().bottom;
  if (heroBottom && mainNavBottom) {
    heroBottom > mainNavBottom ? setBackground("dark") : setBackground("light");
  }
};

const Navigation = (): JSX.Element => {
  const [background, setBackground] = useState<Background>("dark");
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setCurrentBackground(setBackground);
    ["scroll", "resize"].forEach((event) =>
      window.addEventListener(event, () => setCurrentBackground(setBackground))
    );
    return () => {
      ["scroll", "resize"].forEach((event) =>
        window.removeEventListener(event, () =>
          setCurrentBackground(setBackground)
        )
      );
    };
  }, []);

  return (
    <>
      <a
        href="#hero"
        onMouseEnter={() => setAnimate(true)}
        onAnimationEnd={() => setAnimate(false)}
        className={`fixed top-4 z-40 w-full lg:top-8 lg:left-12 lg:w-auto ${
          animate ? "animate-wiggle" : ""
        }`}
      >
        <Image src={logo} alt="Chandra e João" className="m-auto select-none" />
      </a>
      <nav
        id="main-nav"
        className={`fixed top-14 right-20 hidden space-x-8 leading-none lg:block ${
          background === "dark"
            ? "text-white selection:bg-white selection:text-joanGreen-600"
            : ""
        }${
          background === "light"
            ? "text-black selection:bg-black selection:text-white"
            : ""
        } z-40`}
      >
        <a href="#a-festa">A festa</a>
        <a href="#lista-de-presentes">Lista de presentes</a>
        <a href="#confirmar-presenca">Confirmar presença</a>
        <a href="#perguntas-frequentes">Perguntas frequentes</a>
      </nav>
    </>
  );
};

export default Navigation;
