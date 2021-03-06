import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { lightTheme, darkTheme } from "themes";

import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
        <Toaster />
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
