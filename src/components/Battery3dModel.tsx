import { useRef, useState } from 'react';
import { Battery } from '../types';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from '@react-three/drei';

interface Props {
  battery: Battery;
}

export function Battery3dModel({ battery }: Props) {
  const [pointLightPosition, setPointLightPosition] = useState<
    [number, number, number]
  >([0, 10, 10]);
  const pointLight = useRef<THREE.PointLight>(null);
  const gltf = useLoader(GLTFLoader, battery.gltf || '/battery.gltf');

  gltf.scene.rotation.x = Math.PI * 0.2;
  useFrame((state) => {
    setPointLightPosition([
      Math.sin(state.clock.elapsedTime) * 10,
      10,
      Math.sin(state.clock.elapsedTime) * 10,
    ]);
    gltf.scene.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <>
      <pointLight
        intensity={1000}
        ref={pointLight}
        position={pointLightPosition}
      />
      <ambientLight intensity={2} />
      {gltf && <primitive object={gltf.scene} scale={10} />}
      {/* TODO get OrbitControls to work. It's currently having no effect */}
      <OrbitControls />
    </>
  );
}
