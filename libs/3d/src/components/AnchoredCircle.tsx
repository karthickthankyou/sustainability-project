import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { ReactNode } from 'react'
import { radians } from './Cameras'

interface RotatingCircleProps {
  initialRotation: number
  endRotation: number
  progress: number
  children: ReactNode
  position?: THREE.Vector3
}

const RotatingCircle: React.FC<RotatingCircleProps> = ({
  initialRotation,
  endRotation,
  progress,
  children,
  position = new THREE.Vector3(0, 0, 0),
}) => {
  const rotation = new THREE.Euler().setFromVector3(
    new THREE.Vector3().lerpVectors(
      new THREE.Vector3(initialRotation, radians(90), 0),
      new THREE.Vector3(endRotation, radians(90), 0),
      progress,
    ),
  )

  return (
    <group
      rotation={rotation}
      position={position}
      scale={new THREE.Vector3(3, 3, 3)}
    >
      {children}
    </group>
  )
}

type SpawnedCircle = { id: number; progress: number }

interface CircleSpawnerProps {
  spawnInterval: number
  initialRotation: number
  endRotation: number
  duration: number
  childrenFactory: (id: number) => JSX.Element
  position?: THREE.Vector3
  initialDelay?: number
}

const CircleSpawner: React.FC<CircleSpawnerProps> = ({
  spawnInterval,
  initialRotation,
  endRotation,
  duration,
  childrenFactory,
  position,
  initialDelay = 0,
}) => {
  const [circles, setCircles] = useState<Array<SpawnedCircle>>([])

  const lastSpawnTime = useRef<number>(Date.now() + initialDelay * 1000)

  useFrame((_, delta) => {
    if (Date.now() - lastSpawnTime.current >= spawnInterval * 1000) {
      const id = Date.now()
      lastSpawnTime.current = id
      setCircles((prevCircles) => [...prevCircles, { id, progress: 0 }])
    }

    setCircles((prevCircles) =>
      prevCircles
        .map((circle) => {
          const progress = circle.progress + delta / duration
          if (progress >= 1) {
            return null
          }
          return { ...circle, progress }
        })
        .filter((circle): circle is SpawnedCircle => circle !== null),
    )
  })

  return (
    <>
      {circles.map((circle) => (
        <RotatingCircle
          key={circle.id}
          initialRotation={initialRotation}
          endRotation={endRotation}
          progress={circle.progress}
          position={position}
        >
          {childrenFactory(circle.id)}
        </RotatingCircle>
      ))}
    </>
  )
}

export { RotatingCircle, CircleSpawner }
