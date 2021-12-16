import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import "twin.macro";

export const Scene: React.FC<{
  hideControls?: boolean;
  camera?: [number, number, number];
}> = ({ children, ...props }) => {
  return (
    <Canvas
      tw="flex-grow"
      {...props}
      camera={{ position: props.camera, fov: 90 }}
      shadows
    >
      {children}

      {!props.hideControls && <OrbitControls />}
    </Canvas>
  );
};
