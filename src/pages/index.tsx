import type { NextPage } from "next";
import React, { useRef, useState } from "react";
import { Page } from "../layouts/Page";
import { Canvas, useFrame } from "@react-three/fiber";
import tw from "twin.macro";
import { Extrude, OrbitControls, Center } from "@react-three/drei";
import * as THREE from "three";

const Home: NextPage = () => {
  return (
    <Page>
      <header tw="mb-12">
        <h1 tw="text-accent font-bold text-3xl">scenes.</h1>
      </header>

      <div
        css={[
          tw`flex-grow flex flex-col border-dotted border-2 border-fuchsia-900`,
        ]}
      >
        <Canvas
          tw="flex-grow"
          camera={{ position: new THREE.Vector3(8, 5, 40) }}
        >
          <ambientLight />
          <pointLight position={[-20, 10, 25]} />
          <gridHelper
            args={[100, 20, "#4D089A", "#4D089A"]}
            position={[0, 0, -10]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <Center>
            <Block />
          </Center>
          <OrbitControls />
        </Canvas>
      </div>
    </Page>
  );
};

export default Home;

const extrudeSettings = { steps: 2, depth: 10, bevelEnabled: true };
const SIDE = 10;

const Block: React.FC = (props) => {
  const shape = React.useMemo(() => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(SIDE, 0);
    _shape.lineTo(SIDE, SIDE * 2);
    _shape.lineTo(0, SIDE * 2);
    _shape.lineTo(0, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE * 3);
    _shape.lineTo(-SIDE, SIDE);
    _shape.lineTo(0, SIDE);

    return _shape;
  }, []);

  return (
    <>
      <Extrude args={[shape, extrudeSettings]} {...props}>
        <meshPhysicalMaterial
          flatShading
          color="#3E64FF"
          thickness={SIDE}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={1}
          transmission={0.8}
          ior={1.25}
          // attenuationTint="#fff"
          attenuationDistance={0}
        />
      </Extrude>
    </>
  );
};

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
