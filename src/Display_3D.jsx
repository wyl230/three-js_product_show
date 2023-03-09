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
import { useFrame } from '@react-three/fiber'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

extend({ TextGeometry })

const Display_3D = (props) => {

  const { rotating } = useControls({rotating: false})
  const scale = .2;

  // for dragging
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // for dragging end
  const handleKeyPress = (e) => {
    console.log('e',e);
  }
  // const camera_ref = useRef()

  // useFrame((state, delta) => {
  //   camera_ref[0] = props.camera_pos[0];
  //   camera_ref[1] = props.camera_pos[1];
  //   camera_ref[2] = props.camera_pos[2];
  // });

  return (
    <>
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: 
        // camera_ref }}
        [
          props.camera_pos[0], 
          props.camera_pos[1],
          props.camera_pos[2],
        ] }}
    >
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <pointLight position={[100 * scale, 100 * scale, 100 * scale]} color="yellow" />
      {/* --------------------- */}
      {/* <Suspense fallback={null}> suspense里面的东西需要等待所有异步操作都执行完之后才会渲染 */}
        <Text_3D 
          scale={scale}
        />
      {/* </Suspense> */}
      {/* below are the main boxes */}
      {/* <MyBox position={[0, -1, 0]}/>  */}
      <MyBox 
        position={[0, 0, 0]} 
        three_dimension={[100 * scale, 1 * scale, 100 * scale]}    
        color={'hotpink'}
        rotating={rotating}
      />

      <MyBox 
        position={[
          props.component_pos[0], 
          6 * scale, 
          props.component_pos[1]
        ]} 
        three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/>
      {/* <MyBox position={[component_x, 6 * scale, component_z]} three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/> */}

{/* ----------------------------------- */}

      {/* draging start */}
      {/* 这是一个平面 */}
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

      {/* 帮助显示平面的 有辅助线的线面 */}
      <planeHelper args={[floorPlane, 5, "red"]} /> 

      {/* 一片网格 */}
      {/* <gridHelper args={[100, 100]} />  */}

      <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} 
      onKeyPress={handleKeyPress}
      />

      {/* 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。 
          这对于渲染2D场景或者UI元素是非常有用的。 */}
      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
      {/* draging end */}
      {/* <GetObjModel /> */}
    </Canvas>
    </>
  )

}

export default Display_3D;