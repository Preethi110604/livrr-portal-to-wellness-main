import { useGLTF } from '@react-three/drei';

export default function useForestModel() {
  const gltf = useGLTF('/models/sagano_bamboo_forest.glb');
  return {
    ForestModel: () => <primitive object={gltf.scene} scale={1.5} />,
  };
}
