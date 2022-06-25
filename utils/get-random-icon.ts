import emojis from "emojilib";

export const getRandomIcon = () => {
  const emojisChars = Object.keys(emojis);

  const randomIndex = Math.floor(Math.random() * emojisChars.length);

  const randomEmoji = emojisChars[randomIndex];

  return randomEmoji;
};
