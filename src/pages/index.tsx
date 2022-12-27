import { type NextPage } from "next";
import Head from "next/head";

import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import EventDetails from "../components/EventDetails";
import Greeting from "../components/Greeting";
import FoodAndDrinks from "../components/FoodAndDrinks";
import GiftList from "../components/GiftList";
import RSVP from "../components/RSVP";
import FAQ from "../components/FAQ";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chandra e João</title>
        <meta name="description" content="Chandra & João vão finalmente fazer dessa união uma festa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <Hero />
      <section id="a-festa">
        <EventDetails />
      </section>
      <Greeting />
      <FoodAndDrinks />
      <section id="lista-de-presentes">
        <GiftList />
      </section>
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
