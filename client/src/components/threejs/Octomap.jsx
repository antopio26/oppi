import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export function Octomap({voxels}) {
    const { scene } = useThree();
    const instancedVoxels = useRef();

    const boxMaterial = new THREE.MeshMatcapMaterial({
        color: '#919191'
    });

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    useEffect(() => {
        if (!instancedVoxels.current) {
            instancedVoxels.current = new THREE.InstancedMesh(boxGeometry, boxMaterial, 1000000); // Assuming 100,000 instances
            instancedVoxels.current.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
            instancedVoxels.current.count = 0
            scene.add(instancedVoxels.current);
        }
        return () => {
            scene.remove(instancedVoxels.current);
        };
    }, [])


    useEffect(() => {
        if (instancedVoxels.current) {
            instancedVoxels.current.count = voxels.positions.length
            voxels.positions.forEach((position, index) => {
                const matrix = new THREE.Matrix4();
                position.z = position.z + position.y;
                position.y = position.z - position.y;
                position.z = position.z - position.y;
                matrix.compose(position, new THREE.Quaternion(), new THREE.Vector3(voxels.sizes[index], voxels.sizes[index], voxels.sizes[index]));
                instancedVoxels.current.setMatrixAt(index, matrix);
            });

            // Update bounding sphere
            instancedVoxels.current.computeBoundingSphere();

            instancedVoxels.current.instanceMatrix.needsUpdate = true;
            instancedVoxels.current.material.color.needsUpdate = true;

        }
    }, [voxels]);

    return null;
}