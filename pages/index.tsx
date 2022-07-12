import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Modal, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import toast from "react-hot-toast";

import Logo from "assets/logo.svg";
import { copyToClipboard } from "utils/clipboard";
import { getRandomIcon } from "utils/get-random-icon";
import { persistEmoji, getStoredEmoji } from "utils/storage";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const [currentIcon, setCurrentIcon] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClick = useCallback(() => {
    setIsModalVisible((previousState) => !previousState);
  }, []);

  const onThemeChange = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const onGenerateClick = useCallback(() => {
    if (!currentIcon) {
      const icon = getRandomIcon();
      setCurrentIcon(icon);
      persistEmoji(icon);

      copyToClipboard(icon);
    } else {
      copyToClipboard(currentIcon);
    }

    toast.success("Copied to your clipboard");
  }, [currentIcon]);

  useEffect(() => {
    const persistedEmoji = getStoredEmoji();

    if (persistedEmoji) {
      setCurrentIcon(persistedEmoji);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Use this Icon</title>
        <meta
          name="description"
          content="A website that generate a random icon per day!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Button
            onClick={onModalClick}
            light
            size="sm"
            css={{ minWidth: "3rem" }}
          >
            Rules
          </Button>
          <Button
            light
            onClick={onThemeChange}
            size="sm"
            css={{ minWidth: "6rem" }}
          >
            {isDark ? "🌕" : "🌑"}
          </Button>
        </header>
        <div className={styles.content}>
          <Image alt="Logo" src={Logo} />
          <Text h2>UseThisIcon.com</Text>
          <div className={styles["info-container"]}>
            <Text size="1.25rem" weight="medium">
              Generate an icon that you MUST to use at some point of the day
            </Text>
            <Text size="1rem">What are you waiting for?</Text>
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
        <footer className={styles.footer}>
          <Text size="1rem" weight="medium">
            Copyright © 2022 Painted Birds
          </Text>
        </footer>
      </main>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={isModalVisible}
        onClose={onModalClick}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Rules
          </Text>
        </Modal.Header>
        <Modal.Body css={{ gap: 20 }}>
          <Text span>🔆 Generate an Icon</Text>
          <Text span>📣 Copy to the clipboard</Text>
          <Text span>
            🎲 Use the icon in any situation, like in a message, story or
            wherever you want
          </Text>
          <Text span>
            ❤️ Take an screenshot and share it with us at our instagram&nbsp;
            <Link href="https://www.instagram.com/usethisicon/">
              @UseThisIcon
            </Link>
          </Text>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
