import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text } from "@nextui-org/react";

import Logo from "./assets/logo.svg";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Use this Icon</title>
        <meta
          name="description"
          content="A website that generate a random icon per day!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image alt="Logo" src={Logo} />
        <Text h2>UseThisIcon.com</Text>
        <div className={styles["info-container"]}>
          <Text size="1.25rem" weight="medium">
            A website that generate a radom icon per day!
          </Text>
          <Text size="1.25rem">What are you waiting for?</Text>
        </div>
        <Button css={{ background: "#FF2063" }} size="lg" rounded>
          Generate icon
        </Button>
      </main>
    </div>
  );
};

export default Home;
