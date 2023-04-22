import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'

const Control_sider = (props) => {
  // slider 调整了props的值，通过调用App组件的set函数来改变的

  // const { camera } = useThree()
  const item_navs = [
    {
      label: ' 调节xyz ',
      key: '0'
    }, 
    {
      label: 
    <Slider defaultValue={0} 
      // collapsible={true}
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([value, props.component_pos[1]]);
        // setComponent_pos([value, component_pos[1]]);
      }}
    />,
      key: '1'
    }, 
    {
      label: 
    <Slider defaultValue={0} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([props.component_pos[0], value]);
      }}
    />
      ,
      key: '2'
    }, 
    {
      label: '调节相机位置(在拖动硬件的时候的相机位置)',
      key: '3'
    }, 
  ];
  return (
    <>

    <Menu 
        defaultSelectedKeys={['1']} items={item_navs}/>

    <Slider defaultValue={300} 
      min={-1000}
      max={1000}
      onChange={(value) => {
        // console.log(props.camera_pos, 'this');
        props.set_camera_pos(
          [
            value,
            props.camera_pos[1], 
            props.camera_pos[2], 
          ]);
        // camera.position.x = value
      }}
    />
    <Slider defaultValue={300} 
      min={-1000}
      max={1000}
      onChange={(value) => {
        props.set_camera_pos(
          [
            props.camera_pos[0], 
            // 30,
            value,
            props.camera_pos[2], 
          ]);
        // camera.position.y = value
      }}
    />
    <Slider defaultValue={300} 
      min={-1000}
      max={1000}
      onChange={(value) => {
        props.set_camera_pos(
          [
            props.camera_pos[0], 
            props.camera_pos[1], 
            value,
          ]);

        // camera.position.z = value
      }}
    />
    </>
  )
}

export default Control_sider;