import { Canvas, Color } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Text,
} from '@react-three/drei'
import React from 'react'

import { CircleSpawner } from '../components/AnchoredCircle'
import { Euler, Vector3, DoubleSide } from 'three'
import { HollowCircle } from '../components/HollowCircle'
import { GrowingCircle } from '../components/GrowingCircle'
import { CustomOrbitControls } from '../components/CustomOrbitController'

const radians = (degrees: number) => degrees * (Math.PI / 180)

export const Circle = ({
  distance = 10,
  color = 'black',
  rotation = new Euler(0, radians(0), 0),
  size = 0.1,
}: {
  distance?: number
  color?: Color | undefined
  rotation?: Euler
  size?: number
}) => {
  return (
    <mesh position={[0, distance, 0]} rotation={rotation}>
      <circleGeometry attach="geometry" args={[size, 128]} />
      <meshBasicMaterial side={DoubleSide} attach="material" color={color} />
    </mesh>
  )
}

export const DURATION = 12
export const SPAWN_INTERVAL = 0.2
export const FONT_SIZE = 2

const pollutionSpawnerData = [
  {
    title: 'Manufacturing',
    position: new Vector3(-30, 24, 0),
    rotationAngles: [150, 180, 210],
    initialDelay: DURATION / 4,
  },
  {
    title: 'Consumption',
    position: new Vector3(-30, 0, 24),
    rotationAngles: [-60, -120],
    initialDelay: DURATION / 2,
  },
  {
    title: 'Waste management',
    position: new Vector3(-30, -24, 0),
    rotationAngles: [-30, 30],
    initialDelay: (DURATION * 3) / 4,
  },
  {
    title: 'Recycle',
    position: new Vector3(-30, 0, -24),
    rotationAngles: [60, 120],
    initialDelay: DURATION,
  },
]

export const SustainabilityScene = ({
  children,
  camera,
  className = '',
  orbitControls = true,
}: {
  camera?: React.ReactNode
  children?: React.ReactNode
  className?: string
  orbitControls?: boolean
}) => {
  return (
    <Canvas
      style={{
        zIndex: 0,
        height: `calc(100vh - 4rem)`,
        background:
          'linear-gradient(to top right, hsl(10, 15%, 95%), hsl(10, 3%, 30%))',
      }}
      className={className}
    >
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={80}
          near={0.1}
          far={1000}
          position={[80, 40, -40]}
          rotation={[radians(0), radians(90), 0]}
        />
      )}
      {children}

      {orbitControls ? <CustomOrbitControls /> : null}
      <group rotation={new Euler(radians(0), radians(-90), radians(90))}>
        {[8.8, 11.2].map((distance) => (
          <CircleSpawner
            key={distance}
            initialDelay={DURATION / 4}
            spawnInterval={SPAWN_INTERVAL}
            initialRotation={0}
            endRotation={radians(90)}
            duration={distance - 10 + DURATION / 4}
            childrenFactory={(id) => <Circle key={id} distance={distance} />}
          />
        ))}
        {[9.2, 10.8].map((distance) => (
          <CircleSpawner
            key={distance}
            initialDelay={DURATION / 4}
            spawnInterval={SPAWN_INTERVAL}
            initialRotation={0}
            endRotation={radians(180)}
            duration={distance - 10 + DURATION / 2}
            childrenFactory={(id) => <Circle key={id} distance={distance} />}
          />
        ))}
        {[9.6, 10.4].map((distance) => (
          <CircleSpawner
            key={distance}
            initialDelay={DURATION / 4}
            spawnInterval={SPAWN_INTERVAL}
            initialRotation={0}
            endRotation={radians(270)}
            duration={distance - 10 + (DURATION * 3) / 4}
            childrenFactory={(id) => <Circle key={id} distance={distance} />}
          />
        ))}
        {[10].map((distance) => (
          <CircleSpawner
            key={distance}
            initialDelay={DURATION / 4}
            spawnInterval={SPAWN_INTERVAL}
            initialRotation={0}
            endRotation={radians(360)}
            duration={DURATION}
            childrenFactory={(id) => <Circle key={id} distance={distance} />}
          />
        ))}
        <Text
          rotation={new Euler(radians(0), radians(180), radians(90))}
          position={new Vector3(0, 1, -38)}
          color={'Black'}
          fontSize={FONT_SIZE}
          letterSpacing={0.1}
        >
          Recycle
        </Text>
        <Text
          anchorX={'center'}
          rotation={new Euler(radians(90), radians(0), radians(-90))}
          position={new Vector3(0, -38, 0)}
          color={'Black'}
          fontSize={FONT_SIZE}
          outlineColor={'white'}
          letterSpacing={0.1}
        >
          Waste management
        </Text>
        <Text
          rotation={new Euler(radians(0), radians(0), radians(-90))}
          position={new Vector3(0, 0, 38)}
          color={'Black'}
          fontSize={FONT_SIZE}
          letterSpacing={0.1}
        >
          Consumption
        </Text>
        <Text
          anchorX={'center'}
          rotation={new Euler(radians(-90), radians(0), radians(-90))}
          position={new Vector3(0, 38, 0)}
          color={'Black'}
          fontSize={FONT_SIZE}
        >
          Manufacturing
        </Text>
        {/* Planes */}
        <Plane
          name="Raw material plane"
          args={[11, 0.2]}
          position={[-30, 30, -30]}
          rotation={new Euler(radians(0), radians(0), radians(90))}
        >
          <meshBasicMaterial side={DoubleSide} color="#222" />
        </Plane>
        <Plane
          name="Manufacuting plane"
          args={[11, 0.2]}
          position={[0, 30, 0]}
          rotation={new Euler(radians(90), radians(90), 0)}
        >
          <meshBasicMaterial color="#222" side={DoubleSide} />
        </Plane>
        <Plane
          name="Consumption plane"
          args={[11, 0.2]}
          position={[0, 0, 30]}
          rotation={new Euler(0, radians(90), 0)}
        >
          <meshBasicMaterial color="#222" side={DoubleSide} />
        </Plane>
        <Plane
          args={[11, 0.2]}
          position={[0, 0, -30]}
          rotation={new Euler(0, radians(90), 0)}
        >
          <meshBasicMaterial color="#222" side={DoubleSide} />
        </Plane>
        <Plane
          args={[11, 0.2]}
          position={[0, -30, 0]}
          rotation={new Euler(radians(90), radians(90), 0)}
        >
          <meshBasicMaterial color="#222" side={DoubleSide} />
        </Plane>

        {/* Manufacturing */}
        {/* Raw materials */}
        {[26, 27, 28, 29, 31, 32, 33, 34].map((distance) => (
          <group
            key={distance}
            position={[-30, distance, 0]}
            rotation={new Euler(0, radians(90), radians(-90))}
          >
            <CircleSpawner
              spawnInterval={SPAWN_INTERVAL}
              initialRotation={radians(0)}
              endRotation={radians(90)}
              duration={DURATION / 4}
              position={new Vector3(0, 0, 0)}
              childrenFactory={(id) => (
                <Circle
                  color={'black'}
                  rotation={new Euler(radians(-90), 0, 0)}
                  key={id}
                  distance={10}
                />
              )}
            />
          </group>
        ))}
        <Text
          anchorX={'center'}
          rotation={new Euler(radians(180), radians(0), radians(-90))}
          position={new Vector3(-32, 30, -30)}
          color={'Black'}
          fontSize={2}
        >
          Raw materials
        </Text>
        <Text
          rotation={new Euler(radians(90), radians(90), radians(-90))}
          position={new Vector3(-30, 0, 0)}
          color={'#999'}
          fontSize={6}
          anchorX={'center'}
          anchorY={'middle'}
        >
          Environment
        </Text>
        {pollutionSpawnerData.map(
          ({ title, position, rotationAngles, initialDelay }) =>
            rotationAngles.map((angle) => (
              <group
                key={angle}
                position={position}
                rotation={new Euler(0, radians(90), radians(angle))}
              >
                <CircleSpawner
                  initialDelay={initialDelay}
                  spawnInterval={SPAWN_INTERVAL}
                  initialRotation={radians(90)}
                  endRotation={radians(0)}
                  duration={DURATION / 4}
                  position={new Vector3(0, 0, 0)}
                  childrenFactory={(id) => (
                    <Circle
                      color={'darkred'}
                      rotation={new Euler(radians(-90), 0, 0)}
                      key={id}
                      size={0.05}
                      distance={10}
                    />
                  )}
                />
              </group>
            )),
        )}

        <HollowCircle
          opacity={0.4}
          color="white"
          radius={26}
          position={new Vector3(-1, 0, 0)}
          strokeWidth={10}
        />

        {/* <HollowCircle
          color="white"
          opacity={0.6}
          radius={25.8}
          position={new Vector3(-1, 0, 0)}
          strokeWidth={0.2}
        />
        <HollowCircle
          color="white"
          opacity={0.6}
          radius={36}
          position={new Vector3(-1, 0, 0)}
          strokeWidth={0.2}
        /> */}

        <GrowingCircle
          initialDelay={DURATION / 2}
          growthRate={0.3}
          color="darkred"
          position={new Vector3(-30.1, 0, 0)}
        />

        <mesh position={[90, 0, 0]} rotation={new Euler(0, radians(90), 0)}>
          <circleGeometry attach="geometry" args={[240, 128]} />
          <meshBasicMaterial
            side={DoubleSide}
            attach="material"
            color={'#999'}
          />
        </mesh>
        <mesh position={[-90, 0, 0]} rotation={new Euler(0, radians(90), 0)}>
          <circleGeometry attach="geometry" args={[240, 128]} />
          <meshBasicMaterial
            side={DoubleSide}
            attach="material"
            color={'#999'}
          />
        </mesh>
      </group>
    </Canvas>
  )
}
