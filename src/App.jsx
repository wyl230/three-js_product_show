// mine
import MyHeader from './MyHeader'
import MyBox from './App-box'
import Obj from "./Obj.jsx";
import Control_sider from './Control_sider';
// mine end
import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";


import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';
import Property_sider from './views/property_sider';
import GetObjModel from './views/import_modules'
import Display_3D from './Display_3D';
const { Header, Content, Sider } = Layout;







export default function App() {
  const { component_x , component_z } = useControls({ component_x: 0, component_z: 0});
  const [component_pos, setComponent_pos] = useState([0, 0]);


  
  return (
    <>
    <Layout>
      <MyHeader />
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>
        <Canvas 
          dpr={[1, 2]} 
          camera={{ position: [30, 30, 30] }}
        >
          <Display_3D 
            component_pos={component_pos} 
          />
        </Canvas>
      </Content>
      <Sider theme={'light'}>
        <Control_sider 
          set_pos={setComponent_pos}
          component_pos={component_pos}
        />  
      </Sider>
      <Sider theme={'light'}>
        <Property_sider />
      </Sider>
    </Layout>
</>
  )
}

