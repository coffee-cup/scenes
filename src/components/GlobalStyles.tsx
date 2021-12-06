import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { theme, GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.accent`};
    ${tw`antialiased text-fg bg-bg leading-relaxed font-sans`}
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);