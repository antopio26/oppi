import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function Path({nodes, color = "green", lineWidth = 1, nodeRadius = 0.05}) {
    const {scene} = useThree();
    const instancedNodes = useRef();
    const nodeMaterial = new THREE.MeshStandardMaterial({
        color: color
    });
    const nodeGeometry = new THREE.SphereGeometry(nodeRadius, 8, 8);

    useEffect(() => {
        // console.log("Creating instanced nodes")
        if (!instancedNodes.current) {
            instancedNodes.current = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, 500); // Assuming 100,000 instances
            instancedNodes.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
            instancedNodes.current.count = 0;
            scene.add(instancedNodes.current);
        }
        return () => {
            scene.remove(instancedNodes.current);
        };
    }, []);

    useEffect(() => {
        if (instancedNodes.current) {
            instancedNodes.current.count = nodes.length;
            nodes.forEach((position, index) => {
                const matrix = new THREE.Matrix4();
                matrix.compose(position, new THREE.Quaternion(), new THREE.Vector3(1, 1, 1));
                instancedNodes.current.setMatrixAt(index, matrix);
            });
            // Update bounding sphere
            instancedNodes.current.computeBoundingSphere();

            instancedNodes.current.instanceMatrix.needsUpdate = true;
        }
    }, [nodes]);

    useEffect(() => {
        nodeMaterial.color.set(color);
        instancedNodes.current.material = nodeMaterial;
    }, [color]);

    return (
        <group>
            <Line points={nodes.map((node) => [node.x, node.y, node.z])} color={color} lineWidth={lineWidth} />
        </group>
    );
}