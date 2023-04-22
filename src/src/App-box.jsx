import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Divider, Menu, Switch, Breadcrumb, Layout, theme, } from 'antd';
import Property_sider from './views/property_sider';


const { Header, Content, Sider } = Layout;


// to run, delete export default .wyl
export default function MyBox(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if(props.rotating == true) {
      ref.current.rotation.x += delta
      ref.current.rotation.y += delta
      ref.current.rotation.z += delta
    }

    let x_change = Math.round(props.to_pos[0] - ref.current.position.x) 
    let y_change = Math.round(props.to_pos[1]- ref.current.position.y) 
    let z_change = Math.round(props.to_pos[2]- ref.current.position.z) 

    // console.log(x_change);
        
    if(x_change != 0) {
      if(x_change > 0) {
        ref.current.position.x += delta * x_change  
        ref.current.position.x += delta * 5
      } else {
        ref.current.position.x += delta * x_change 
        ref.current.position.x -= delta * 5
      }
    }



    if(y_change != 0) {
      if(y_change > 0) {
        ref.current.position.y += delta * y_change  
        ref.current.position.y += delta * 5
      } else {
        ref.current.position.y += delta * y_change 
        ref.current.position.y -= delta * 5
      }
    }


    if(z_change != 0) {
      if(z_change > 0) {
        ref.current.position.z += delta * z_change  
        ref.current.position.z += delta * 5
      } else {
        ref.current.position.z += delta * z_change 
        ref.current.position.z -= delta * 5
      }
    }
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
      {/* <boxGeometry args={[100, 1, 1]} /> */}

      <mesh>
        {/* <boxGeometry args={[100, 1, 1]} />
        <meshStandardMaterial color={props.color} /> */}
      </mesh>

      {/* <mesh>
        <boxGeometry args={[10, 100, 1]} />
        <meshStandardMaterial color={props.color} />
      </mesh> */}

      <boxGeometry args={props.three_dimension} />
      {/* 三维 */}
      <meshStandardMaterial color={props.color} />
      {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
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
          <my_Box position={[0, -1, 0]} />
          <my_Box position={[0, 1, 0]} />
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


