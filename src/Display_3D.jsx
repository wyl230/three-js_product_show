// mine
import MyBox from './App-box'
import Obj from "./Obj.jsx";
import Text_3D from "./Text_3D.jsx";
// mine end
import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

extend({ TextGeometry })

const Display_3D = (props) => {
  const scale = .2;

  // for dragging
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // for dragging end
  const handleKeyPress = (e) => {
    console.log('e',e);
  }
  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <pointLight position={[100 * scale, 100 * scale, 100 * scale]} color="yellow" />
      <Suspense fallback={null}>
      <Text_3D 
        scale={scale}
      />
      </Suspense>
      {/* <MyBox position={[0, -1, 0]}/>  */}
      <MyBox position={[0, 0, 0]} three_dimension={[100 * scale, 1 * scale, 100 * scale]}    color={'hotpink'}/>
      <MyBox position={[props.component_pos[0], 6 * scale, props.component_pos[1]]} three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/>
      {/* <MyBox position={[component_x, 6 * scale, component_z]} three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/> */}


      {/* draging start */}
      <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.1, 0]}
      receiveShadow
      >
      <planeGeometry attach="geometry" args={[10, 10]} receiveShadow />
      <meshPhongMaterial
          attach="material"
          color="#ccc"
          side={THREE.DoubleSide}
          receiveShadow
      />
      </mesh>
      <planeHelper args={[floorPlane, 5, "red"]} />
      {/* <planeHelper args={[floorPlane, 5, "red"]} /> */}

      {/* <gridHelper args={[100, 100]} />  */}
      {/* 一片网格 */}

      <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} 
      onKeyPress={handleKeyPress}
      />

      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
      {/* draging end */}
      {/* <GetObjModel /> */}
    </>
  )

}

export default Display_3D;