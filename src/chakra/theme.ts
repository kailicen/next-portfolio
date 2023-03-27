// 1. Import `extendTheme`
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/500.css";
import { extendTheme } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
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
    global: (props: any) => ({
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
        backgroundColor: props.colorMode === "dark" ? "#2D3748" : "#F7FAFC",
      },
      "::-webkit-scrollbar-thumb": {
        background: props.colorMode === "dark" ? "#CBD5E0" : "#4A5568",
        borderRadius: "5px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: props.colorMode === "dark" ? "#A0AEC0" : "#718096",
      },
      "::-webkit-scrollbar-track": {
        background: props.colorMode === "dark" ? "#4A5568" : "#EDF2F7",
        borderRadius: "5px",
      },
    }),
  },
});

export default theme;
