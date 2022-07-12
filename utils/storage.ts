const KEY = "emoji";

export interface Emoji {
  icon: string;
  date: Date;
}

export const persistEmoji = (emoji: Emoji) => {
  return localStorage.setItem(KEY, JSON.stringify(emoji));
};

export const getStoredEmoji = (): Emoji | null => {
  return JSON.parse(localStorage.getItem(KEY) || "null");
};
