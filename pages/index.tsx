import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Modal, Text, useTheme } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import toast from "react-hot-toast";

import Logo from "assets/logo.svg";
import { ClipboardIcon } from "components/clipboard-icon";
import { copyToClipboard } from "utils/clipboard";
import { getRandomIcon } from "utils/get-random-icon";
import { persistEmoji, getStoredEmoji, Emoji } from "utils/storage";

import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const [currentEmoji, setCurrentEmoji] = useState<Emoji | null>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClick = useCallback(() => {
    setIsModalVisible((previousState) => !previousState);
  }, []);

  const onThemeChange = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const onCopyToClipboard = useCallback(() => {
    if (currentEmoji) {
      copyToClipboard(currentEmoji.icon);
      toast.success("Copied to your clipboard");
    }
  }, [currentEmoji]);

  const onGenerateClick = useCallback(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    if (currentEmoji) {
      const storedDate = new Date(currentEmoji.date);
      const storedDay = storedDate.getDate();
      const storedMonth = storedDate.getMonth();

      if (storedDay === currentDay && storedMonth === currentMonth) {
        toast("You already generated an emoji today!", {
          icon: "😑",
        });

        return;
      }
    }

    const icon = getRandomIcon();
    const emoji = { icon, date: new Date() };

    setCurrentEmoji(emoji);
    persistEmoji(emoji);

    onCopyToClipboard();
  }, [currentEmoji, onCopyToClipboard]);

  useEffect(() => {
    const persistedEmoji = getStoredEmoji();

    if (persistedEmoji) {
      setCurrentEmoji(persistedEmoji);
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
            {currentEmoji ? currentEmoji.icon : "Generate icon"}
          </Button>
          {currentEmoji && (
            <Button
              light
              icon={<ClipboardIcon />}
              css={{
                color: "#6D6D6D",
                minWidth: "15rem",
              }}
              onClick={onCopyToClipboard}
            >
              Copy to clipboard
            </Button>
          )}
          <div className={styles["info-container"]}>
            <Link href="https://www.instagram.com/usethisicon/" passHref>
              <a target="_blank" rel="noopener noreferrer">
                <Text weight="medium">
                  Take a screenshot and share with us
                  <Text
                    size="1.25rem"
                    css={{
                      textGradient:
                        "90deg, #4F5BD5 39.66%, #962FBF 52.03%, #D62976 65.56%, #FA7E1E 75.11%, #FEDA75 90.6%",
                    }}
                  >
                    @usethisicon
                  </Text>
                </Text>
              </a>
            </Link>
            <Text size="1rem">Give a chance to this icon</Text>
          </div>
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
            <Link href="https://www.instagram.com/usethisicon/" passHref>
              <a target="_blank" rel="noopener noreferrer">
                @UseThisIcon
              </a>
            </Link>
          </Text>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
