import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

export default function GetObjModel() {
  const obj = useLoader(OBJLoader, '/chip.obj')
  return <primitive object={obj} />
}