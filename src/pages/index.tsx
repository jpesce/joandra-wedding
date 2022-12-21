import { type NextPage } from "next";
import Head from "next/head";
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';

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
    </>
  );
};

export default Index;
