import { useState, useEffect } from 'react';
import type { FC } from "react";
import Logo from '../Logo';

const Navigation: FC = () => {
  const [textClass, setTextClass] = useState("text-white selection:bg-white selection:text-joanGreen-500");
  const [animation, setAnimation] = useState("animate-wiggle");

  const scrollListener = () => {
    if(window.scrollY < window.innerHeight - 63) {
      return setTextClass("text-white selection:bg-white selection:text-joanGreen-500");
    } else {
      return setTextClass("text-black selection:bg-black selection:text-white");
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
    }
  }, []);

  return (
    <>
      <a href="#"
        onMouseEnter={() => setAnimation("animate-wiggle")}
        onAnimationEnd={() => setAnimation("")}
        className={`fixed top-8 left-12 z-40 w-[7rem] ${animation}`}>
        <Logo />
      </a>
      <nav className={`fixed top-14 right-20 space-x-8 ${textClass} z-40`}>
        <a href="#">A festa</a>
        <a href="#">Lista de presentes</a>
        <a href="#">Confirmar presença</a>
        <a href="#">Perguntas frequentes</a>
      </nav>
    </>
  );
}

export default Navigation;
