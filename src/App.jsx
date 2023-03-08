import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

import MyBox from './App-box'
import Obj from "./Obj.jsx";


import { Divider, Menu, Switch, Breadcrumb, Layout, theme, } from 'antd';
import Property_sider from './views/property_sider';
import GetObjModel from './views/import_modules'
const { Header, Content, Sider } = Layout;

extend({ TextGeometry })



const scale = .2;

function HelloText() {
  const ref = useRef()
  const { color, text } = useControls({ color: 'aqua', text: 'products demo'})
  const font = useLoader(FontLoader, '/typefaces/optimer_bold.typeface.json')
  const config = useMemo(() => ({ font, size: 10 * scale, height: 2 * scale}), [font])
  useLayoutEffect(() => {
    ref.current.position.x = -50 * scale; // 左右
    ref.current.position.y = -100 * scale; // 上下
    ref.current.position.z = 0; // 前后
  }
  // void ref.current.geometry.center()
  , [text])
  return (
    <mesh ref={ref}>
      <textGeometry args={[text, config]} />

      <meshStandardMaterial color={color} />
    </mesh>
  )
}



export default function App() {
  const item_navs = [
    {
      label: '3D产品展示',
      key: '1'
    }
  ]


  // for dragging
  const [isDragging, setIsDragging] = useState(false);
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  // for dragging end
  return (
    <>
    <Layout>
      <Header className='header'>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item_navs}/>
      </Header>
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 100] }}
        >
          <OrbitControls makeDefault />
          <ambientLight intensity={0.5} />
          <pointLight position={[100 * scale, 100 * scale, 100 * scale]} color="yellow" />
          <Suspense fallback={null}>
            <HelloText />
          </Suspense>
          {/* <MyBox position={[0, -1, 0]}/>  */}
          <MyBox position={[0, 0, 0]} three_dimension={[100 * scale, 1 * scale, 100 * scale]}    color={'hotpink'}/>
          <MyBox position={[0 * scale, 6 * scale, 0]} three_dimension={[30 * scale, 10 * scale, 30 * scale]} color='orange'/>


          {/* draging start */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.1, 0]}
            receiveShadow
          >
            <planeBufferGeometry attach="geometry" args={[10, 10]} receiveShadow />
            <meshPhongMaterial
              attach="material"
              color="#ccc"
              side={THREE.DoubleSide}
              receiveShadow
            />
          </mesh>
          <planeHelper args={[floorPlane, 5, "red"]} />
          {/* <planeHelper args={[floorPlane, 5, "red"]} /> */}

          <gridHelper args={[100, 100]} />

          <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} />

          <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

          <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
          {/* draging end */}
          {/* <GetObjModel /> */}
        </Canvas>
      </Content>
      <Sider theme={'light'}>
        <Property_sider />
      </Sider>
    </Layout>
</>
  )
}

