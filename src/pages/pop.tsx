import { useHelper } from "@react-three/drei";
import { LightProps, MeshProps, useFrame, Vector3 } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Light, Mesh, PointLightHelper } from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { rand, randItem } from "../utils";
import { motion } from "framer-motion/three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  SSAO,
  Sepia,
  Scanline,
} from "@react-three/postprocessing";

export const Pop: React.FC = () => {
  return (
    <Page>
      <Scene tw="border-2 border-dotted border-violet-900" camera={[0, 0, 20]}>
        <Lights />

        <BallGenerator />

        <EffectComposer>
          <Bloom intensity={100.0} luminanceThreshold={1.0} />
          <SSAO />
        </EffectComposer>

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default Pop;

export interface Ball {
  id: number;
  position: Vector3;
  scale: number;
  born: number; // seconds
  colour: string;
}

let ballId = 0;

const FREQ = 0.2; // seconds

const min = -20;
const max = 20;

const colours = ["hotpink", "deeppink", "gold"];

const randomBall = (): Ball => {
  return {
    id: ballId++,
    position: [rand(min, max), rand(min, max), rand(min, max)],
    scale: rand(0.5, 1.5),
    born: new Date().getTime(),
    colour: randItem(colours),
  };
};

const BallGenerator: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const count = useRef(1);

  useFrame(({ mouse, camera, viewport, clock }) => {
    if (mouse.x === 0 && mouse.y === 0) return;

    if (clock.elapsedTime > count.current * FREQ) {
      const vector = new THREE.Vector3(
        mouse.x,
        mouse.y,
        camera.position.z + 0.5,
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = camera.position.z - 5 - camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      const newBall = { ...randomBall(), position: pos };
      setBalls(balls => [...balls, newBall]);

      count.current += 1;
      // count.current = Math.floor(clock.elapsedTime);
    }
  });

  return (
    <>
      {balls.map(b => (
        <SphereItem key={b.id} ball={b} />
      ))}
    </>
  );
};

const Lights: React.FC<LightProps> = props => {
  const ref = useRef<Light>(null!);
  // useHelper(ref, PointLightHelper, 1);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} ref={ref} intensity={2} />
      <directionalLight />
    </>
  );
};

const SphereItem: React.FC<{ ball: Ball }> = ({ ball }) => {
  const mesh = useRef<Mesh>(null!);

  return (
    <motion.mesh
      ref={mesh}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      position={ball.position}
    >
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial attach="material" color={ball.colour} />
    </motion.mesh>
  );
};
