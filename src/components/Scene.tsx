import { applyProps, Canvas } from "@react-three/fiber";
import React from "react";
import tw from "twin.macro";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export const Scene: React.FC<{
  hideControls?: boolean;
  camera?: THREE.Vector3;
}> = ({ children, ...props }) => {
  return (
    <Canvas tw="flex-grow" {...props} camera={{ position: props.camera }}>
      {children}

      {!props.hideControls && <OrbitControls />}
    </Canvas>
  );
};
