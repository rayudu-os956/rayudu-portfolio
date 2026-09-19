import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const GOLD = "#e8b94f";
const CYAN = "#31d8ff";
const WHITE = "#f5f3ed";
const DARK = "#071014";
const MUTED = "#8e9297";


/* ================= COMPASS ================= */

function Compass() {
  const group = useRef(null);
  const outerRing = useRef(null);
  const innerRing = useRef(null);
  const needle = useRef(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.06;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.1,
      0.025
    );

    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.06,
      0.025
    );

    if (outerRing.current) {
      outerRing.current.rotation.z += delta * 0.055;
    }

    if (innerRing.current) {
      innerRing.current.rotation.x += delta * 0.09;
      innerRing.current.rotation.y += delta * 0.04;
    }

    if (needle.current) {
      needle.current.rotation.z =
        -0.25 +
        Math.sin(state.clock.elapsedTime * 0.65) * 0.07;
    }
  });

  return (
    <group ref={group}>

      <mesh ref={outerRing}>
        <torusGeometry args={[1.65, 0.055, 16, 120]} />

        <meshStandardMaterial
          color={GOLD}
          metalness={0.8}
          roughness={0.22}
        />
      </mesh>


      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.025, 16, 100]} />

        <meshStandardMaterial
          color="#8f6b28"
          metalness={0.75}
          roughness={0.28}
        />
      </mesh>


      <mesh rotation={[0.65, 0.35, 0]}>
        <torusGeometry args={[1.3, 0.018, 16, 100]} />

        <meshStandardMaterial
          color={GOLD}
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>


      <mesh ref={innerRing}>
        <torusGeometry args={[1.15, 0.016, 12, 100]} />

        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>


      <mesh>
        <sphereGeometry args={[0.87, 48, 48]} />

        <meshStandardMaterial
          color={DARK}
          metalness={0.4}
          roughness={0.48}
        />
      </mesh>


      <mesh>
        <sphereGeometry args={[0.89, 24, 24]} />

        <meshBasicMaterial
          color={CYAN}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>


      <group
        ref={needle}
        position={[0, 0, 0.92]}
      >

        <mesh position={[0, 0.43, 0]}>
          <coneGeometry args={[0.12, 0.86, 3]} />

          <meshStandardMaterial
            color={GOLD}
            metalness={0.55}
            roughness={0.3}
          />
        </mesh>


        <mesh
          position={[0, -0.43, 0]}
          rotation={[0, 0, Math.PI]}
        >
          <coneGeometry args={[0.12, 0.86, 3]} />

          <meshStandardMaterial color={WHITE} />
        </mesh>


        <mesh>
          <sphereGeometry args={[0.11, 24, 24]} />

          <meshStandardMaterial
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>

      </group>


      <CompassLabel
        position={[0, 1.95, 0]}
        text="N"
      />

      <CompassLabel
        position={[1.95, 0, 0]}
        text="E"
      />

      <CompassLabel
        position={[0, -1.95, 0]}
        text="S"
      />

      <CompassLabel
        position={[-1.95, 0, 0]}
        text="W"
      />

    </group>
  );
}


/* ================= LABEL ================= */

function CompassLabel({ position, text }) {
  return (
    <Text
      position={position}
      fontSize={0.13}
      color={GOLD}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}


/* ================= DESTINATION ================= */

function Destination({
  position,
  title,
  subtitle,
  target,
  cyan = false,
}) {
  const group = useRef(null);
  const node = useRef(null);
  const ring = useRef(null);
  const light = useRef(null);

  const [hovered, setHovered] = useState(false);

  const colour = cyan ? CYAN : GOLD;

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.position.y =
      position[1] +
      Math.sin(
        state.clock.elapsedTime * 1.2 +
        position[0]
      ) * 0.035;

    const targetScale =
      hovered ? 1.35 : 1;

    group.current.scale.x =
      THREE.MathUtils.lerp(
        group.current.scale.x,
        targetScale,
        0.1
      );

    group.current.scale.y =
      THREE.MathUtils.lerp(
        group.current.scale.y,
        targetScale,
        0.1
      );

    group.current.scale.z =
      THREE.MathUtils.lerp(
        group.current.scale.z,
        targetScale,
        0.1
      );

    if (ring.current) {
      ring.current.rotation.z +=
        delta * (hovered ? 2.4 : 0.6);
    }

    if (node.current) {
      node.current.material.emissiveIntensity =
        THREE.MathUtils.lerp(
          node.current.material.emissiveIntensity,
          hovered ? 6 : 1.8,
          0.08
        );
    }

    if (light.current) {
      light.current.intensity =
        THREE.MathUtils.lerp(
          light.current.intensity,
          hovered ? 12 : 0,
          0.08
        );
    }
  });

  const activate = (event) => {
    event.stopPropagation();

    setHovered(true);

    document.body.style.cursor =
      "pointer";
  };

  const deactivate = (event) => {
    event.stopPropagation();

    setHovered(false);

    document.body.style.cursor =
      "default";
  };

  const handleClick = (event) => {
    event.stopPropagation();

    if (!target) return;

    const section =
      document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={activate}
      onPointerOut={deactivate}
      onPointerDown={handleClick}
    >

      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />

        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>


      <mesh ref={node}>
        <sphereGeometry args={[0.13, 32, 32]} />

        <meshStandardMaterial
          color={colour}
          emissive={colour}
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>


      <mesh
        ref={ring}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.22, 0.012, 12, 60]} />

        <meshBasicMaterial
          color={colour}
          transparent
          opacity={hovered ? 1 : 0.6}
          toneMapped={false}
        />
      </mesh>


      <mesh
        scale={hovered ? 1 : 0.6}
        rotation={[0, Math.PI / 2, 0]}
      >
        <torusGeometry args={[0.29, 0.008, 12, 60]} />

        <meshBasicMaterial
          color={colour}
          transparent
          opacity={hovered ? 0.85 : 0}
          toneMapped={false}
        />
      </mesh>


      <mesh
        scale={hovered ? 1 : 0.4}
        rotation={[Math.PI / 3, 0, Math.PI / 4]}
      >
        <torusGeometry args={[0.35, 0.005, 12, 60]} />

        <meshBasicMaterial
          color={colour}
          transparent
          opacity={hovered ? 0.4 : 0}
          toneMapped={false}
        />
      </mesh>


      <pointLight
        ref={light}
        color={colour}
        intensity={0}
        distance={2}
      />


      <Text
        position={[0, 0.35, 0]}
        fontSize={hovered ? 0.17 : 0.14}
        color={colour}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>


      <Text
        position={[0, 0.18, 0]}
        fontSize={0.055}
        color={hovered ? WHITE : MUTED}
        anchorX="center"
        anchorY="middle"
      >
        {hovered
          ? `// ${subtitle}`
          : subtitle}
      </Text>


      {hovered && (
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.045}
          color={WHITE}
          anchorX="center"
          anchorY="middle"
        >
          CLICK TO EXPLORE
        </Text>
      )}

    </group>
  );
}


/* ================= ORBIT ================= */

function Orbit({
  radius,
  rotation = [0, 0, 0],
  cyan = false,
}) {
  return (
    <mesh rotation={rotation}>

      <torusGeometry
        args={[radius, 0.006, 8, 160]}
      />

      <meshBasicMaterial
        color={cyan ? CYAN : GOLD}
        transparent
        opacity={0.24}
      />

    </mesh>
  );
}


/* ================= PACKET ================= */

function Packet({
  radius,
  speed,
  offset = 0,
  cyan = true,
}) {
  const packet = useRef(null);

  useFrame((state) => {
    if (!packet.current) return;

    const angle =
      state.clock.elapsedTime *
      speed +
      offset;

    packet.current.position.x =
      Math.cos(angle) * radius;

    packet.current.position.y =
      Math.sin(angle) * radius;
  });

  const colour =
    cyan ? CYAN : GOLD;

  return (
    <mesh ref={packet}>

      <sphereGeometry args={[0.035, 16, 16]} />

      <meshBasicMaterial
        color={colour}
        toneMapped={false}
      />

    </mesh>
  );
}


/* ================= STARS ================= */

function StarField() {
  const positions = useMemo(() => {
    const points = [];

    for (let i = 0; i < 130; i++) {
      const x =
        Math.sin(i * 12.9898) *
        Math.cos(i * 4.1414) *
        5;

      const y =
        Math.sin(i * 7.233) *
        Math.cos(i * 2.817) *
        3.5;

      const z =
        Math.sin(i * 3.731) *
        2 -
        2;

      points.push(x, y, z);
    }

    return new Float32Array(points);
  }, []);

  return (
    <points>

      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color={WHITE}
        size={0.012}
        transparent
        opacity={0.35}
        sizeAttenuation
      />

    </points>
  );
}


/* ================= SCENE ================= */

function Scene() {
  return (
    <>

      <ambientLight intensity={1.1} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
        color="#fff2cd"
      />

      <pointLight
        position={[-3, 2, 4]}
        intensity={18}
        color={CYAN}
      />

      <pointLight
        position={[3, -2, 3]}
        intensity={15}
        color={GOLD}
      />


      <StarField />


      <Orbit
        radius={2.25}
        cyan
      />

      <Orbit
        radius={2.65}
        rotation={[0.45, 0.25, 0]}
      />

      <Orbit
        radius={2.95}
        rotation={[-0.35, 0.15, 0]}
        cyan
      />


      <Packet
        radius={2.25}
        speed={0.35}
      />

      <Packet
        radius={2.25}
        speed={0.35}
        offset={Math.PI}
        cyan={false}
      />

      <Packet
        radius={2.65}
        speed={-0.22}
        offset={1}
      />


      <Compass />


      <Destination
        position={[-2.25, 1.35, 0]}
        title=".NET"
        subtitle="BUILD"
        target="#projects"
      />


      <Destination
        position={[2.25, 1.25, 0]}
        title="AZURE"
        subtitle="CLOUD"
        target="#cloud"
        cyan
      />


      <Destination
        position={[2.5, -1.25, 0]}
        title="CCNA"
        subtitle="ROUTE · SWITCH"
        target="#ccna"
      />


      <Destination
        position={[-2.4, -1.35, 0]}
        title="NETWORKS"
        subtitle="CONNECT"
        target="#ccna"
        cyan
      />


      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.055}
        rotateSpeed={0.3}
      />

    </>
  );
}


/* ================= EXPORT ================= */

export default function GrandLine3D() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "520px",
      }}
    >

      <Canvas
        camera={{
          position: [0, 0, 6.7],
          fov: 43,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >

        <Scene />

      </Canvas>

    </div>
  );
}