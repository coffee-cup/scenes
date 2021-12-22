import type { NextPage } from "next";
import React from "react";
import { Page } from "../layouts/Page";
import "twin.macro";
import { Link } from "../components/Link";

const Home: NextPage = () => {
  return (
    <Page tw="p-8">
      <div tw="max-w-4xl w-full mx-auto">
        <header tw="mt-12 mb-12">
          <h1 tw="text-accent font-bold text-4xl">scenes.</h1>
        </header>

        <ul tw="space-y-4">
          <SceneItem name="tetris" />
          <SceneItem name="cube" />
          <SceneItem name="orbs" />
        </ul>
      </div>
    </Page>
  );
};

export default Home;

const SceneItem: React.FC<{ name: string }> = ({ name }) => {
  return (
    <li>
      <Link
        href={`/${name}`}
        tw="underline text-lg hover:text-amber-300 font-bold"
      >
        {name}
      </Link>
    </li>
  );
};
