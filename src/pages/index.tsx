import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Page } from "../layouts/Page";
import { Canvas, useFrame } from "@react-three/fiber";
import tw from "twin.macro";

const Home: NextPage = () => {
  return (
    <Page>
      <header tw="pt-12 pb-8">
        <h1 tw="text-accent font-bold text-3xl">scenes.</h1>
      </header>

      <div css={[tw`flex-grow flex flex-col`, { border: "dotted 2px red" }]}>
        <Canvas tw="flex-grow">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Cube position={[0, 0, 0]} />
        </Canvas>
      </div>
    </Page>
  );
};

export default Home;

const Cube: React.FC = (props) => {
  const mesh = useRef<any>();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
