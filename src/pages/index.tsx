import type { NextPage } from "next";
import React from "react";
import { Page } from "../layouts/Page";
import { styled } from "../stitches.config";
import { Text } from "../components/Text";

const Home: NextPage = () => {
  return (
    <Page>
      <Header>
        <Title css={{ marginBottom: "$5" }}>scenes</Title>
        <Text>an experiment.</Text>
      </Header>

      <Text>boop</Text>
    </Page>
  );
};

export default Home;

const Header = styled("header", {
  marginBottom: "$6",
});

const Title = styled("h1", {
  color: "$amber10",
});