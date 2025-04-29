import { useGLTF } from '@react-three/drei';

export default function useIslandModel() {
  const gltf = useGLTF('/models/italy_mountain_castle_landscape.glb');
  return {
    IslandModel: () => <primitive object={gltf.scene} scale={2} />,
  };
}
