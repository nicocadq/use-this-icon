import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text } from "@nextui-org/react";

import Logo from "assets/logo.svg";
import { copyToClipboard } from "utils/clipboard";
import { getRandomIcon } from "utils/get-random-icon";
import { persistEmoji, getStoredEmoji } from "utils/storage";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const [currentIcon, setCurrentIcon] = useState<string>("");

  const onGenerateClick = useCallback(() => {
    if (!currentIcon) {
      const icon = getRandomIcon();
      setCurrentIcon(icon);
      persistEmoji(icon);

      copyToClipboard(icon);
    } else {
      copyToClipboard(currentIcon);
    }
  }, [currentIcon]);

  useEffect(() => {
    const persistedEmoji = getStoredEmoji();

    if (persistedEmoji) {
      setCurrentIcon(persistedEmoji);
    }
  }, []);

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
          <Text size="1.25rem" weight="medium" css={{ textAlign: "center" }}>
            Generate an icon that you MUST to use at some point of the day
          </Text>
          <Text size="1.25rem">What are you waiting for?</Text>
        </div>
        {currentIcon ? (
          <Button bordered color="primary" auto css={{ padding: "1rem" }}>
            {currentIcon}
          </Button>
        ) : (
          <Button
            css={{ background: "#FF2063" }}
            size="lg"
            rounded
            onPress={onGenerateClick}
          >
            Generate icon
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
