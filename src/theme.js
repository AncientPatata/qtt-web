import { extendTheme } from "@chakra-ui/react";
import "@fontsource/rubik";
import "@fontsource/roboto";

const theme = extendTheme({
  fonts: {
    heading: `'Rubik', sans-serif`,
    body: "'Roboto',Helvetica Neue,sans-serif",
  },
});

export default theme;
