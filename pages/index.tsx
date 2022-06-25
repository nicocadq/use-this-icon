import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Button, Modal, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

import Logo from "assets/logo.svg";
import { copyToClipboard } from "utils/clipboard";
import { getRandomIcon } from "utils/get-random-icon";
import { persistEmoji, getStoredEmoji } from "utils/storage";

import styles from "styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  const [currentIcon, setCurrentIcon] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };

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
          <Text css={{ cursor: "pointer" }} onClick={() => setVisible(true)}>
            Rules
          </Text>
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
          <Text size="1.25rem" weight="medium" css={{ textAlign: "center" }}>
            Copyright © 2022 Painted Birds
          </Text>
        </footer>
      </main>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
