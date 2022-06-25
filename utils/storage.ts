const KEY = "emoji";

export const persistEmoji = (emoji: string) => {
  return localStorage.setItem(KEY, emoji);
};

export const getStoredEmoji = (): string | null => {
  return localStorage.getItem(KEY);
};
