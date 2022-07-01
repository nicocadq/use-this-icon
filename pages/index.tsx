import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

import Logo from "assets/logo.svg";
import { CopyToClipboard } from "components/copy-to-clipboard";
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
        <Image alt="Logo" src={Logo} />
        <Text h3>UseThisIcon.com</Text>
        <div className={styles["info-container"]}>
          {currentIcon ? (
            <Text size="1.25rem" weight="medium" css={{ textAlign: "center" }}>
              Let’s see how far this can go!
            </Text>
          ) : (
            <>
              <Text size="1.3rem" weight="medium" css={{ textAlign: "center" }}>
                Generate an icon that you MUST to use at some point of the day
              </Text>
              <Text size="1rem" weight="light">
                What are you waiting for?
              </Text>
            </>
          )}
        </div>
        {currentIcon ? (
          <>
            <Button
              bordered
              css={{
                borderRadius: "20px",
                minHeight: "5rem",
                borderWidth: "3px",
                "@hover": {
                  backgroundColor: "transparent",
                },
              }}
              color="error"
              ghost
            >
              <Text size="2.5rem">{currentIcon}</Text>
            </Button>
            <CopyToClipboard currentIcon={currentIcon} />
            <Text h6>
              Take a screenshot and share with us{" "}
              <span
                style={{
                  background: " -webkit-linear-gradient(#eee, #333)",
                }}
              >
                @usethisicon
              </span>
            </Text>
          </>
        ) : (
          <Button color="error" size="xl" rounded onPress={onGenerateClick}>
            Generate icon
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
