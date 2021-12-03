import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  amberDark,
  greenDark,
  violetDark,
} from "@radix-ui/colors";
import { createStitches, globalCss } from "@stitches/react";

export const { styled, theme } = createStitches({
  theme: {
    colors: {
      ...grayDark,
      ...blueDark,
      ...redDark,
      ...amberDark,
      ...greenDark,
      ...violetDark,
    },
    fonts: {
      sans: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
      "-webkit-font-smoothing": "antialiased",
    },
    fontSizes: {
      1: "12px",
      2: "14px",
      3: "16px",
      4: "20px",
      5: "24px",
      6: "32px",
    },
    space: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
      5: "64px",
      6: "128px",
    },
    sizes: {
      1: "4px",
      2: "8px",
      3: "16px",
      4: "32px",
      5: "64px",
      6: "128px",
    },
  },
});

export const globalStyles = globalCss({
  "*": { margin: 0 },
  "html,body": { height: "100%" },
  body: {
    fontFamily: "$sans",
    margin: 0,
    padding: 0,
    backgroundColor: "$violet2",
    color: "$gray12",
  },
});
