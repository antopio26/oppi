import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {Line} from "@react-three/drei";
import {Vector3} from "three";
import useTheme from "../../hooks/Theme";

export function PointSelector() {
    const { camera, pointer, raycaster } = useThree();
    const pointRef = useRef();
    const [clicks, setClicks] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { primary, light } = useTheme();

    useEffect(() => {
        const handlePointerMove = (event) => {
            // Project mouse position to 3D space
            raycaster.setFromCamera(pointer, camera);

            if (clicks === 0) {
                // Create a plane at Z = 0
                const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                const intersects = new THREE.Vector3();

                raycaster.ray.intersectPlane(plane, intersects);

                if (intersects) {
                    const { x, y } = intersects;
                    setPosition([x, y, 0]); // Lock Z to 0
                }
            } else if (clicks === 1) {

                const positionVec = new THREE.Vector3(...position);

                // Get camera direction vector
                const direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                direction.z = 0; // Lock Z to 0

                // Create a plane with direction and passing through position
                const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(direction, positionVec);

                // Intersect ray with plane
                const intersects = new THREE.Vector3();

                raycaster.ray.intersectPlane(plane, intersects);
                setPosition((prev) => [prev[0], prev[1], intersects.z]);
            }
        };

        const handlePointerDown = () => {
            setClicks((prev) => prev + 1);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerdown', handlePointerDown);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerDown);
        };
    }, [clicks, pointer, camera, raycaster]);

    useFrame(() => {
        if (pointRef.current) {
            pointRef.current.position.set(...position);
        }
    });

    return (
        <>
            <group ref={pointRef}>

                {/* Line pointing upward */}
                <Line position={new Vector3(0, 0, -position[2])} points={[[0, 0, 0], [0, 0, 3]]} color={primary} lineWidth={1} dashed={true} dashScale={10} depthTest={false} />
                <Line position={new Vector3(0, 0, -position[2])} points={[[0, 0, 0], [0, 0, 3]]} color="white" lineWidth={1} dashed={true} dashScale={10} depthTest={true} />

                {/* Behind Objects */}
                <mesh>
                    {clicks !== 0 ?
                        <sphereGeometry args={[0.1, 16, 16]}/> : <circleGeometry args={[0.3, 32]}/>
                    }
                    { /* Dark gray material */ }
                    <meshBasicMaterial color={primary} depthTest={false} />
                </mesh>

                {/* Normal */}
                <mesh>
                    { clicks !== 0 ?
                        <sphereGeometry args={[0.1, 16, 16]} /> : <circleGeometry args={[0.3, 32]} />
                    }
                    { /* White material */ }
                    <meshBasicMaterial color="white" depthTest={true} />
                </mesh>
            </group>
        </>
    );
}