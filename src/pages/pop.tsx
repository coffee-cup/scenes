import { Stats } from "@react-three/drei";
import {
  Euler,
  LightProps,
  MeshProps,
  useFrame,
  useThree,
  Vector3,
} from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Light, Mesh } from "three";
import * as THREE from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { rand } from "../utils";

export const Pop: React.FC = () => {
  return (
    <Page>
      <Scene tw="border-2 border-dotted border-violet-900" camera={[0, 0, 20]}>
        <Lights />

        <BallGenerator />

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
}

let ballId = 0;

const FREQ = 0.5; // seconds

const min = -20;
const max = 20;

const randomBall = (): Ball => {
  return {
    id: ballId++,
    position: [rand(min, max), rand(min, max), rand(min, max)],
    scale: rand(0.5, 1.5),
    born: new Date().getTime(),
  };
};

const BallGenerator: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const count = useRef(0);

  useFrame(({ mouse, camera, viewport, clock }) => {
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

      count.current += 1;
      const newBall = { ...randomBall(), position: pos };
      setBalls(balls => [...balls, newBall]);
    }
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newBall = randomBall();
  //     const now = new Date().getTime();
  //     setBalls(balls => [...balls, newBall]);
  //   }, FREQ);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      {balls.map(b => (
        <SphereItem key={b.id} position={b.position} scale={b.scale} />
      ))}
    </>
  );
};

const Lights: React.FC<LightProps> = props => {
  const ref = useRef<Light>(null!);
  // useHelper(ref, DirectionalLightHelper, 1);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        ref={ref}
        position={[0, 2, 0]}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
    </>
  );
};

const RotatingBox: React.FC<MeshProps> = props => {
  const myMesh = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.rotation.y = a * 0.4;
    myMesh.current.rotation.z = a * 0.1;
  });

  return (
    <mesh ref={myMesh} {...props}>
      <boxBufferGeometry args={[1, 1]} />
      <meshPhongMaterial color="gold" />
    </mesh>
  );
};

const SphereItem: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh {...props} ref={mesh}>
      <sphereBufferGeometry args={[0.5, 20, 20]} />
      <meshPhongMaterial attach="material" color="deeppink" />
    </mesh>
  );
};

const Plane: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  return (
    <mesh ref={mesh} {...props} receiveShadow>
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color="#18003d" attach="material" />
    </mesh>
  );
};
