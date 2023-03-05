import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Divider, Menu, Switch, Breadcrumb, Layout, theme, } from 'antd';
import Property_sider from './views/property_sider';


const { Header, Content, Sider } = Layout;


// to run, delete export default .wyl
export default function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta
    ref.current.rotation.z += delta
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[10, 1, 1]} />
      {/* 三维 */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

// to run, change this
// export default function App() {
function App() {
  const item_navs = [
    {
      label: '3D产品展示',
      key: '1'
    }
  ]

  return (
    <>
    {/* <h1>3D产品展示</h1> */}
    <Layout>
      <Header className='header'>
        <Menu mode="horizontal" defaultSelectedKeys={['1']} items={item_navs}/>
      </Header>
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>
{/* <div style={{ position: "relative", width: 300, height: 300 }}> */}

        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.45} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[0, -1, 0]} />
          <Box position={[0, 1, 0]} />
          {/* 三个变量，分别是左右 上下 前后 */}
          <OrbitControls />
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


