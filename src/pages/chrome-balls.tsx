import { Center, Plane, Stage, useHelper } from "@react-three/drei";
import { LightProps, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  Light,
  Mesh,
  MeshStandardMaterial,
  PointLightHelper,
} from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { clamp } from "../utils";

const numRows = 20;
const numCols = 20;

const rowGap = 0.2;
const colGap = 0.2;

const ballRadius = 0.4;
const ballSize = ballRadius * 2;

const ChromeBalls: React.FC = () => {
  return (
    <Page>
      <Leva />

      <Scene camera={{ position: [0, 0.1, 7.4] }} shadows>
        <Lights />

        {Array.from({ length: numRows }).map((_, i) => (
          <Balls key={i} index={i} />
        ))}

        {/* <Plane args={[200, 40]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
          <meshStandardMaterial
            attach="material"
            // color="#170d2f"
          />
        </Plane> */}

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default ChromeBalls;

const Lights: React.FC<LightProps> = props => {
  const p1 = useRef<Light>(null!);
  const p2 = useRef<Light>(null!);
  const p3 = useRef<Light>(null!);
  const p4 = useRef<Light>(null!);
  const p5 = useRef<Light>(null!);

  // useHelper(p1, PointLightHelper, 0.5);
  // useHelper(p2, PointLightHelper, 0.5);
  // useHelper(p3, PointLightHelper, 0.5);
  // useHelper(p4, PointLightHelper, 0.5);
  // useHelper(p5, PointLightHelper, 0.5);

  useFrame(({ clock, mouse, camera }) => {
    // const p1x = Math.sin(clock.elapsedTime) * 6;

    const v = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
    v.sub(camera.position).normalize();
    const distance = (p1.current.position.z - camera.position.z) / v.z;
    const pos = new THREE.Vector3();
    pos.copy(camera.position).add(v.multiplyScalar(distance));

    p1.current.position.set(pos.x, pos.y, pos.z);
  });

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}

      <pointLight
        ref={p1}
        distance={3}
        decay={1}
        position={[-2, 2.2, 2]}
        intensity={2.5}
        color="cyan"
      />

      <pointLight
        ref={p2}
        distance={7}
        decay={1}
        intensity={1.4}
        position={[-4, -4, 4]}
        color="#ff470f"
      />

      <pointLight
        ref={p3}
        distance={10}
        decay={1}
        intensity={0.8}
        position={[4, 0, 4.2]}
        color="#ae00ff"
      />

      <pointLight
        ref={p4}
        distance={6}
        decay={1}
        intensity={0.5}
        position={[5, 0, 1.2]}
        color="#ff0000"
      />

      <pointLight
        ref={p5}
        distance={7}
        decay={2}
        intensity={0.1}
        position={[-5, 7, 0.8]}
        color="#eeff00"
      />
    </>
  );
};

const Balls: React.FC<MeshProps & { index: number }> = props => {
  return (
    <group
      position={[
        numCols * (ballSize + colGap) * -0.5,
        numRows * (ballSize + rowGap) * -0.5 +
          props.index * (ballSize + rowGap),
        0,
      ]}
    >
      {Array.from({ length: numCols }).map((_, i) => (
        <SphereItem
          key={i}
          position={[i * (ballSize + colGap), 1.4, 0]}
          index={i}
        />
      ))}
    </group>
  );
};

const SphereItem: React.FC<MeshProps & { index: number }> = props => {
  const mesh = useRef<Mesh>(null!);

  const { metalness, roughness } = useControls({
    metalness: 0.2,
    roughness: 0.1,
  });

  useFrame(({ clock, mouse }) => {
    const pos = mesh.current.position;
    mesh.current.position.set(
      pos.x,
      pos.y,
      Math.sin(clock.elapsedTime + props.index * 0.1) * 0.0,
    );
  });

  return (
    <mesh {...props} ref={mesh} castShadow>
      <sphereGeometry args={[ballRadius, 60, 60]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        metalness={metalness}
        roughness={roughness}
      />
      {/* <meshNormalMaterial attach="material" /> */}
    </mesh>
  );
};
