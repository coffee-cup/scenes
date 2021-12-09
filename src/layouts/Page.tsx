import Head from "next/head";
import React from "react";
import "twin.macro";

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>scenes</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main tw="flex flex-col h-screen pt-8 px-8 pb-8">{children}</main>
    </>
  );
};
