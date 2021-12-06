import Head from "next/head";
import React from "react";
import { styled } from "../stitches.config";

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>scenes</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>{children}</Main>
    </>
  );
};

const Main = styled("main", {
  maxWidth: "1440px",
  margin: "0 auto",
  marginTop: "$40",
  padding: "0 $8",
});
