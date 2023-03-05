import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import Box from './App-box'


import { Divider, Menu, Switch, Breadcrumb, Layout, theme, } from 'antd';
import Property_sider from './views/property_sider';
const { Header, Content, Sider } = Layout;

extend({ TextGeometry })




function HelloText() {
  const ref = useRef()
  const { color, text } = useControls({ color: 'aqua', text: 'products demo'})
  const font = useLoader(FontLoader, '/typefaces/optimer_bold.typeface.json')
  const config = useMemo(() => ({ font, size: 1, height: .2 }), [font])
  useLayoutEffect(() => void ref.current.geometry.center(), [text])
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

  return (
    <>
    <Layout>
      <Header className='header'>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item_navs}/>
      </Header>
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>

    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 20] }}>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="yellow" />
      <Suspense fallback={null}>
        <HelloText />
      </Suspense>
      <Box position={[0, -1, 0]} />
      <Box position={[0, 1, 0]} />
    </Canvas>
      </Content>
      <Sider theme={'light'}>
        {/* 产品属性信息 */}
        <Property_sider />
      </Sider>
    </Layout>
</>
  )
}

