import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { CircleGeometry, DoubleSide, Euler, Mesh, Vector3 } from 'three'
import { Circle } from '@react-three/drei'
import { radians } from './Cameras'

interface GrowingCircleProps {
  initialDelay?: number
  color?: string
  maxRadius?: number
  growthRate?: number
  rotation?: THREE.Euler
  position?: THREE.Vector3
}

export const GrowingCircle: React.FC<GrowingCircleProps> = ({
  initialDelay = 0,
  color = 'black',
  maxRadius = 100,
  growthRate = 1,
  rotation = new Euler(radians(0), radians(90), radians(0)),
  position = new Vector3(0, 0, 0),
}) => {
  const mesh = useRef<Mesh>(null!)
  const startTime = useRef(0)
  const isStarted = useRef(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      startTime.current = Date.now()
      isStarted.current = true
    }, initialDelay * 1000)
    return () => clearTimeout(timeoutId)
  }, [initialDelay])

  useFrame(() => {
    if (isStarted.current && mesh.current) {
      const elapsedSeconds = (Date.now() - startTime.current) / 1000
      const radius = Math.min(elapsedSeconds * growthRate, maxRadius)
      if ((mesh.current.geometry as any).parameters.radius !== radius) {
        ;(mesh.current.geometry as any).parameters.radius = radius
        mesh.current.geometry.dispose()
        mesh.current.geometry = new CircleGeometry(radius, 32)
      }
    }
  })

  return (
    <mesh position={position} rotation={rotation} ref={mesh}>
      <circleGeometry attach="geometry" args={[0.1, 32]} />
      <meshBasicMaterial
        side={DoubleSide}
        transparent={true}
        opacity={0.3}
        attach="material"
        color={color}
      />
    </mesh>
  )
}
