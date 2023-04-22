// 此处为可以移动的物体
import React, { useState, useRef } from "react";
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import keydown from 'react-keydown';

import { OrbitControls, Plane, Sphere, Stage, Torus, Box } from '@react-three/drei'

function Obj({ setIsDragging, floorPlane, is_rotating, }) {
  const [pos, setPos] = useState([0, 1, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();

  const dragObjectRef = useRef();

  const [spring, api] = useSpring(() => ({
    // position: [0, 0, 0],
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 }
  }));

  const bind = useDrag(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        console.log('active', planeIntersectPoint);
        
        // setPos([planeIntersectPoint.x, planeIntersectPoint.y, 1.5]);
        
        setPos([planeIntersectPoint.x, 1.5, planeIntersectPoint.z]);
      }

      setIsDragging(active);

      let starts = null;
      if (is_rotating) {
        starts = {
          position: pos,
          scale: active ? 1.2 : 1,
          rotation: [y / aspect, x / aspect, 0] // 设置拖动的时候是否能够旋转
        }
      } else {
        starts = {
          position: pos,
          scale: active? 1 : 1.2,
        }
      }
      api.start(starts);
      // api.start({
      //   // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
      //   position: pos,
      //   scale: active ? 1.2 : 1,
      //   // rotation: [y / aspect, x / aspect, 0] // 设置拖动的时候是否能够旋转
      // });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <animated.mesh {...spring} {...bind()} castShadow>

      <boxGeometry 
        args={[30,10,30]} // 可拖动的物体的大小
        ref={dragObjectRef}
        attach="geometry"
      />
       {/* <dodecahedronGeometry // 十二面体
        ref={dragObjectRef}
        attach="geometry"
        args={[1.4, 0]}
      /> */}
      <meshNormalMaterial attach="material" />
    </animated.mesh>
  );
}

export default Obj;