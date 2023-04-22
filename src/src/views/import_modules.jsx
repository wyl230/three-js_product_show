import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import React, { useState, useEffect, Suspense, useLayoutEffect, useMemo, useRef } from 'react'

import { useThree } from "@react-three/fiber";
import { Html, useProgress } from '@react-three/drei'

function Loader() {
  console.log('2342342')
  const { progress } = useProgress()
  return <Html center>{progress} % 加载中，请耐心等待</Html>
}


const AsyncPrimitiveComponent = React.lazy(() => import('./AsyncPrimitive'));
// const AsyncPrimitiveComponent = React.lazy(() => <primitive object={object} scale={scale} />);
// const AsyncPrimitiveComponent = React.lazy((object, scale) => AsyncPrimitive(object, scale));

// const MyComponent = React.lazy(() => 
//         <Html center>done</Html>
// );

const Model = (props) => {
  // const gltf = useLoader(GLTFLoader, "./right.glb");
  // return <primitive object={gltf.scene} scale={1} />;

  // const object = useLoader(OBJLoader, 'right.obj')
  const pos = props.origin_point.map((value, index) => value + props.position[index]);
  const object = useLoader(OBJLoader, props.file_name)
  return ( <primitive object={object} scale={1} position={pos} rotation={props.rotation}/>)
};

export default function GetObjModel(props) {
  // .obj
  // 可用的参数
  // scale
  // 
  // const obj = useLoader(OBJLoader, '/chip.obj')
  // const object = useLoader(OBJLoader, props.file_name)
  // const obj = useLoader(OBJLoader, '../assets/righ.obj')
  // console.log(obj);

  const { camera } = useThree();
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(camera,'zxcv', Date());
      props.set_camera_pos(camera.position)
    }, 1000);

    // 这里需要 return 一个清除定时器的函数
    return () => clearInterval(interval);
  }, []);


  return (
      <Suspense fallback={<Loader />}>
        <Model file_name={props.file_name} position={props.position} rotation={props.rotation} origin_point={props.origin_point}
        set_camera_pos={props.set_camera_pos}/>
        {/* <MyComponent /> */}
        {/* <Html center>done</Html> */}
        {/* <primitive object={object} scale={1}/> */}
        {/* <AsyncPrimitiveComponent file_name={props.file_name}/> */}
      </Suspense>
  )

  // .glb
  // const gltf = useLoader(GLTFLoader, '../assets/right.glb')
  // return <primitive object={gltf} />
}
