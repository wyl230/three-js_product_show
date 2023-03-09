import { Canvas, useLoader, extend } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useState, Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'

import { OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";



import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
extend({ TextGeometry })
export default function Text_3D(props) {
  const ref = useRef()
  const { color, text } = useControls({ color: 'aqua', text: 'products demo'})
  const font = useLoader(FontLoader, '/typefaces/optimer_bold.typeface.json')
  const config = useMemo(() => ({ font, size: 10 * props.scale, height: 2 * props.scale}), [font])
  useLayoutEffect(() => {
    ref.current.position.x = -50 * props.scale; // 左右
    ref.current.position.y = -100 * props.scale; // 上下
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
