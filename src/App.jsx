// mine
import MyHeader from './MyHeader'
import Control_sider from './Control_sider';
// mine end
import React, { useState, useEffect, } from 'react'

import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';
import Property_sider from './views/property_sider';
import Display_3D from './Display_3D';
const { Header, Content, Sider } = Layout;

export default function App() {
  // const { component_x , component_z } = useControls({ component_x: 0, component_z: 0});
  const [component_pos, setComponent_pos] = useState([0, 0]);
  const [camera_pos, set_camera_pos] = useState([30, 30, 30]);
  const [x, setX] = useState(10);
  const [y243, setY] = useState(10);
  const [pos, setPos] = useState([10,10]);
  
  // sety(123) wrong once onchange(x,y) (1,2)
  // setY(123) wrong once onchange() ()
  const [cnt, setCnt] = useState(true);
  const onChange = () => {
    console.log(cnt);
    // setY(cnt);
    setCnt(!cnt)
    // setComponent_pos([1, 1]);
  }

  // useEffect(() => {
  //   // Should not ever set state during rendering, so do this in useEffect instead.
  //   // setStateValues(allowedState);
  //   setComponent_pos(pos);
  // }, [pos]);
  
  return (
    <>
    <Layout>
      <MyHeader />
        <button onClick={(e) => setCnt(!cnt)}> buttoon </button>
    </Layout>
    <Layout>
      <Content style={{ position: "relative", width: window.innerWidth, height: window.innerHeight }}>
        <Display_3D 
          component_pos={component_pos} 
          camera_pos={camera_pos}
        />
      </Content>
      <Sider theme={'light'}>
        <Control_sider 
          set_pos={setComponent_pos}
          component_pos={component_pos}
          camera_pos={camera_pos}
          set_camera_pos={set_camera_pos}
          // x={x}
          // setX={onChange}
        />  
      </Sider>
      <Sider theme={'light'}>
        <Property_sider />
      </Sider>
    </Layout>
</>
  )
}

