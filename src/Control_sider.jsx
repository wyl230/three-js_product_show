import { Divider, Menu, Switch, Breadcrumb,  theme, Layout, Slider, } from 'antd';
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
const Control_sider = (props) => {
  // slider 调整了props的值，通过调用App组件的set函数来改变的
  return (
    <>
    调节xyz
    <Slider defaultValue={0} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([value, props.component_pos[1]]);
        // setComponent_pos([value, component_pos[1]]);
      }}
    />
    <Slider defaultValue={0} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(value);
        props.set_pos([props.component_pos[0], value]);
      }}
    />

    <p> 调节相机位置</p>
    <Slider defaultValue={30} 
      min={-100}
      max={100}
      onChange={(value) => {
        // console.log(props.camera_pos, 'this');
        props.set_camera_pos(
          [
            value,
            props.camera_pos[1], 
            props.camera_pos[2], 
          ]);
      }}
    />
    <Slider defaultValue={30} 
      min={-100}
      max={100}
      onChange={(value) => {
        props.set_camera_pos(
          [
            props.camera_pos[0], 
            // 30,
            value,
            props.camera_pos[2], 
          ]);
      }}
    />
    <Slider defaultValue={30} 
      min={-100}
      max={100}
      onChange={(value) => {
        props.set_camera_pos(
          [
            props.camera_pos[0], 
            props.camera_pos[1], 
            value,
          ]);
      }}
    />
    </>
  )
}

export default Control_sider;