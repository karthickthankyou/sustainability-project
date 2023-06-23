import React from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface CurvedTextProps {
  text: string
  radius: number
}

export const CurvedText: React.FC<CurvedTextProps> = ({ text, radius = 5 }) => {
  // Function to position each letter along a curve
  const curveModifier = (v: THREE.Vector3, i: number, a: string[]) => {
    const radians = ((Math.PI * 2) / a.length) * i
    v.x = Math.cos(radians) * radius
    v.z = Math.sin(radians) * radius
    v.y = 0
  }

  return (
    <group position={[0, 0, 0]}>
      {text
        .split('')
        .map((char, i, array) => (
          <Text
            key={i}
            position={[i, 0, -0]}
            fontSize={1}
            color="black"
            // @ts-ignore
            onUpdate={(self: THREE.Object3D) => self.geometry?.center()}
          >
            {char}
            <meshBasicMaterial attach="material" side={THREE.DoubleSide} />
          </Text>
        ))
        .map((text, i, array) => {
          // @ts-ignore
          text.position?.setFromVector3(text.position.apply(curveModifier))
          return text
        })}
    </group>
  )
}
