import React, { useEffect, useRef, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils'

import { PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

interface CameraProps {}
export const radians = (degrees: number) => degrees * (Math.PI / 180)

export const Camera: React.FC<CameraProps> = () => {
  const { camera } = useThree()

  useEffect(() => {
    if (camera) {
      camera.rotation.set(-radians(30), radians(45), 0)
      camera.updateProjectionMatrix()
    }
  }, [camera])
  return (
    <PerspectiveCamera
      makeDefault
      fov={75}
      near={0.1}
      far={1000}
      position={[0, 5, 10]}
    />
  )
}

export const RotatingCamera = ({
  speed = 0.001,
  minFov = 30,
  maxFov = 60,
  radius = 40,
}) => {
  const [angle, setAngle] = useState(() => randInt(0, radius))
  const [fov, setFov] = useState(() => randInt(minFov, maxFov))

  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  useFrame((state, delta) => {
    if (cameraRef.current) {
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI))

      cameraRef.current.position.x = radius * Math.sin(angle)
      cameraRef.current.position.z = radius * Math.cos(angle)
      cameraRef.current.position.y = 200
      cameraRef.current.lookAt(1, 0, 1)

      const amplitude = (maxFov - minFov) / 2
      const oscillationSpeed = 0.05
      setFov(
        minFov +
          amplitude +
          Math.sin(state.clock.elapsedTime * oscillationSpeed) * amplitude,
      )
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={[0, 200, 0]}
      />
    </>
  )
}
export const StraightCamera = ({
  fov = 80,
  position = [1, 300, -1] as [number, number, number],
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={position}
      />
    </>
  )
}
