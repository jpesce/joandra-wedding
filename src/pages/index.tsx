import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import Greeting from "../components/Greeting";
import FoodAndDrinks from "../components/FoodAndDrinks";
import { CartProvider } from "../components/GiftList/CartContext";
import GiftList from "../components/GiftList";
import RSVP from "../components/RSVP";
import FAQ from "../components/FAQ";

const Index: NextPage = () => {
  const path = useRouter().pathname;

  const meta = {
    title: "Chandra e João",
    description: "Chandra & João vão finalmente fazer dessa união uma festa!",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Chandra e João" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.chandraejoao.com${path}`}
        />
        <meta
          property="og:image"
          content="https://www.chandraejoao.com/og-image.jpg"
        />
      </Head>

      <Navigation />
      <Hero
        text={
          <>
            <span className="italic">Chandra & João</span> vão finalmente fazer
            dessa união uma festa.
          </>
        }
        actions={[
          {
            label: "Escolher presente",
            href: "#lista-de-presentes",
          },
          {
            label: "Confirmar presença",
            href: "#confirmar-presenca",
          },
        ]}
      />
      <section id="a-festa">
        <EventDetails />
      </section>
      <Greeting />
      <FoodAndDrinks />
      <CartProvider>
        <section id="lista-de-presentes">
          <GiftList />
        </section>
      </CartProvider>
      <section id="confirmar-presenca">
        <RSVP />
      </section>
      <section id="perguntas-frequentes">
        <FAQ />
      </section>
    </>
  );
};

export default Index;
