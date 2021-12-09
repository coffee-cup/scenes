import { Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import "twin.macro";
import { theme } from "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";

export const Cube: React.FC = () => {
  return (
    <Page>
      <Scene tw="border-2 border-dotted border-violet-900">
        <ambientLight color={theme`colors.pink.500`} />
        <pointLight position={[-4, 5, 2]} />
        <Center>
          <CubeItem />
        </Center>
      </Scene>
    </Page>
  );
};

export default Cube;

const CubeItem: React.FC = (props) => {
  const mesh = useRef<any>();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={clicked ? 4 : 2}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
