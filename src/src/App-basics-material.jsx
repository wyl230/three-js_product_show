import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { RefObject, Suspense, useState } from 'react'
import * as THREE from 'three'



import { Divider, Menu, Switch, Breadcrumb, Layout, theme, } from 'antd';
import Property_sider from './views/property_sider';
const { Header, Content, Sider } = Layout;


function Model() {
  const materialProps = useControls({ color: 'orange', opacity: 1, roughness: 0.5, metalness: 0.5 })
  const [material, setMaterial] = useState()
  return (
    <>
      <meshPhysicalMaterial ref={setMaterial} side={THREE.DoubleSide} {...materialProps} />
      {/* <Sphere args={[1, 32, 32]} material={material} /> */}
      {/* <Plane args={[2, 2]} position={[3, 0, 0]} material={material} /> */}
      {/* <Torus args={[1, 0.5, 32, 32]} position={[-3.5, 0, 0]} material={material} /> */}
      {/* <Sphere args={[1, 32, 32]} position={[0,0,10]} material={material} /> */}
      <Box args={[10, .1, 10]} position={[0,0,0]} material={material} />
      {/* 左右 上下 前后 */}
      <Box args={[3, 1, 3]} position={[0, 0.6, 0]} material={material} />
    </>
  )
}

export default function App() {
  const item_navs = [
    {
      label: '3D产品展示',
      key: '1'
    }
  ]

  return (
    <>
    <Layout>
      <Header className='header'>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item_navs}/>
      </Header>
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>

    <Canvas shadows dpr={[1, 2]}>
      <OrbitControls makeDefault />
      <Suspense fallback={null}>
        <Stage intensity={1}>
          <Model />
        </Stage>
      </Suspense>
    </Canvas>
      </Content>
      <Sider theme={'light'}>
        <Property_sider />
      </Sider>
    </Layout>
</>
  )
}

