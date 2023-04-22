// mine
import MyBox from './App-box'
import Obj from "./Obj.jsx";
import Text_3D from "./Text_3D.jsx";
// mine end
import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";



import  GetObjModel from './views/import_modules';

extend({ TextGeometry })


// 解决相机抖动问题
// function Scene() {
//   const cameraRef = useRef();

//   // 记录上一次更新时间戳
//   const [lastUpdate, setLastUpdate] = useState(Date.now());

//   useFrame((state, deltaTime) => {
//     // 计算时间差值
//     const now = Date.now();
//     const interval = now - lastUpdate;

//     // 当时间差值大于设定值时，进行相机位置更新
//     if (interval >= 100) {   // 控制更新间隔为100ms
//       // 更新相机位置代码

//       // 更新上一次更新时间戳
//       setLastUpdate(now);
//     }

//     // 控制相机视野方向
//     cameraRef.current.lookAt(0, 0, 0);
//   });

//   return (
//     <>
//       <PerspectiveCamera
//         ref={cameraRef}
//         fov={60}
//         aspect={window.innerWidth / window.innerHeight}
//         near={0.1}
//         far={100}
//         position={[0, 0, 5]}
//       />
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       <Box />
//     </>
//   );
// }
// end


const Display_3D = (props) => {

  const { rotating } = useControls({rotating: false})
  const scale = 2;

  // for dragging
  const [isDragging, setIsDragging] = useState(false);
  // const [camera_pos, set_camera_pos] = useState([500, 500, 500]);
  // const { props.camera_pos } = useControls({camera_pos: [500, 500, 500]});

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

  const right_angle = -Math.PI / 2
  const origin_point = [-100, 0, -200];

  const cameraRef = useRef();

  return (
    <>
    <Canvas 
      dpr={[1, 2]} 
      camera={
        { 
          // position: [ props.camera_pos[0], props.camera_pos[1], props.camera_pos[2], ],
          position: props.camera_pos,
          near: 100, // 小于这个距离会消失
          far: 10000 // 超过这个距离会消失
        } 
      }
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
        to_pos={[0, 0, 0]} 
      />

      <MyBox 
        position={[ 0, 6 * scale, 0 ]} 
        to_pos={[
          props.component_pos[0], 
          6 * scale, 
          props.component_pos[1]
        ]} 
        three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/>
      {/* <MyBox position={[component_x, 6 * scale, component_z]} three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/> */}

      {/* dragging start */}
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

      <Obj 
        setIsDragging={setIsDragging} 
        floorPlane={floorPlane} 
        onKeyPress={handleKeyPress}
        is_rotating={false}
      />

      {/* 在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。 
          这对于渲染2D场景或者UI元素是非常有用的。 */}
      <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

      <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
      {/* draging end */}
          
      <mesh
      >
      <GetObjModel file_name='right.obj' position={[0,0,0]} origin_point={origin_point} set_camera_pos={props.set_camera_pos}/>
      <GetObjModel file_name='left.obj' position={[0,0,400]} origin_point={origin_point}  set_camera_pos={props.set_camera_pos}/>
      <GetObjModel file_name='盖板.obj' position={[270,172,200]} rotation={[0, right_angle, 0]} origin_point={origin_point}
      style={{display: 'none'}  } set_camera_pos={props.set_camera_pos}
      />
      <GetObjModel file_name='底板.obj' position={[270,-178,200]} rotation={[0, right_angle, 0]} origin_point={origin_point}
      set_camera_pos={props.set_camera_pos}
      />
      {/* <GetObjModel file_name='前后面板.obj' position={[240,-90,200]} rotation={[0,right_angle,0]} origin_point={origin_point}/> */}
      {/* <GetObjModel file_name='前后面板.obj'/>  */}
      {/* 前后面板过大，加载比较耗时 */}
      </mesh>
    </Canvas>
    </>
  )

}

export default Display_3D;