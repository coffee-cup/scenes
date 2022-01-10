import * as THREE from "three";
import { Stats, useHelper } from "@react-three/drei";
import { LightProps, MeshProps, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import React, { useRef } from "react";
import {
  DirectionalLightHelper,
  Light,
  Mesh,
  MeshNormalMaterial,
  MeshPhongMaterial,
} from "three";
import "twin.macro";
import { Scene } from "../components/Scene";
import { Page } from "../layouts/Page";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export const Orb: React.FC = () => {
  return (
    <Page>
      <Leva />

      <Scene camera={{ position: [0, 0, 1.0] }}>
        <Lights />
        <SphereItem position={[0, 0, 0]} />

        {/* <Stats /> */}
      </Scene>
    </Page>
  );
};

export default Orb;

// const c1 = new THREE.Color("#001aff");
const c1 = new THREE.Color("#e900ff");
const c2 = new THREE.Color("#ff9000");

const Lights: React.FC<LightProps> = props => {
  const directionalLight = useRef<Light>(null!);
  // useHelper(directionalLight, DirectionalLightHelper, 1);

  const rectAreaLight = useRef<Light>(null!);
  useHelper(rectAreaLight, RectAreaLightHelper);

  useFrame(({ mouse }) => {
    rectAreaLight.current.lookAt(0, 0, 0);

    const dirLight = directionalLight.current;

    const r = Math.min(1, mouse.length());
    dirLight.color = dirLight.color.lerpColors(c1, c2, r);

    const n = 20;
    dirLight.position.set(mouse.x * n, mouse.y * n, dirLight.position.z);
  });

  return (
    <>
      <ambientLight intensity={0.1} color={c1} />
      <directionalLight
        ref={directionalLight}
        position={[0, 2, 10]}
        intensity={3.0}
        // color={"peachpuff"}
        color={c1}
      />

      <rectAreaLight
        ref={rectAreaLight}
        position={[1, 0.5, 4]}
        intensity={0.0}
        width={6}
        height={6}
        color={"cyan"}
      />
    </>
  );
};

const SphereItem: React.FC<MeshProps> = props => {
  const mesh = useRef<Mesh>(null!);

  const { metalness, roughness } = useControls({
    metalness: 0,
    roughness: 0.48,
  });

  return (
    <mesh {...props} ref={mesh}>
      <sphereGeometry args={[0.5, 40, 40]} />
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
