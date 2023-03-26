// 1. Import `extendTheme`
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/500.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";
import { Input } from "./input";

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  config,

  fonts: {
    body: "Open Sans, sans-serif",
    heading: `'Raleway', sans-serif`,
  },

  styles: {
    global: {
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "5px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "5px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  },
});

export default theme;
