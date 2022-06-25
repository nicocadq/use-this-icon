import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

import Logo from "assets/logo.svg";
import { copyToClipboard } from "utils/clipboard";
import { getRandomIcon } from "utils/get-random-icon";
import { persistEmoji, getStoredEmoji } from "utils/storage";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
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
        <div className={styles.header}>
          {isDark ? (
            <Text
              h3
              css={{ cursor: "pointer" }}
              onClick={() => setTheme("light")}
            >
              🌕
            </Text>
          ) : (
            <Text
              h3
              css={{ cursor: "pointer" }}
              onClick={() => setTheme("dark")}
            >
              🌑
            </Text>
          )}
        </div>
        <div className={styles.body}>
          <Image alt="Logo" src={Logo} />
          <Text h2>UseThisIcon.com</Text>
          <div className={styles["info-container"]}>
            <Text size="1.25rem" weight="medium">
              A website that generate a radom icon per day!
            </Text>
            <Text size="1.25rem">What are you waiting for?</Text>
          </div>
          <Button
            css={{ background: "#FF2063" }}
            size="lg"
            rounded
            onPress={onGenerateClick}
          >
            {currentIcon ? currentIcon : "Generate icon"}
          </Button>
        </div>
        <footer>
          <Text size="1.25rem" weight="medium">
            Copyright © 2022 Painted Birds
          </Text>
        </footer>
      </main>
    </div>
  );
};

export default Home;
