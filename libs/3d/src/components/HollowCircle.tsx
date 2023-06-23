import React from 'react'
import { Ring } from '@react-three/drei'
import * as THREE from 'three'
import { radians } from './Cameras'

interface HollowCircleProps {
  radius: number
  strokeWidth?: number
  color?: string
  rotation?: THREE.Euler
  position?: THREE.Vector3
  opacity?: number
}

export const HollowCircle: React.FC<HollowCircleProps> = ({
  radius,
  strokeWidth = 1,
  color = 'black',
  rotation = new THREE.Euler(radians(0), radians(90), radians(0)),
  position = new THREE.Vector3(0, 0, 0),
  opacity = 1,
}) => {
  return (
    <Ring
      position={position}
      rotation={rotation}
      args={[radius, radius + strokeWidth, 64]}
    >
      <meshBasicMaterial
        transparent={true}
        opacity={opacity}
        attach="material"
        color={new THREE.Color(color)}
        side={THREE.DoubleSide}
      />
    </Ring>
  )
}
