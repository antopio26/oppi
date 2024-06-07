import {useThree} from "@react-three/fiber";
import useTheme from "../../hooks/Theme";
import {useEffect} from "react";
import * as THREE from "three";

export function Helpers() {
    const { scene, camera } = useThree();
    const { primary, background, light } = useTheme();

    useEffect(() => {
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        camera.up.set(0, 0, 1);

        // Add fog to the scene
        scene.fog = new THREE.Fog(background, 5, 40);

        // Add a grid helper to the scene
        const gridHelper = new THREE.GridHelper(100, 100, primary, light);
        gridHelper.rotation.x = Math.PI / 2;
        scene.add(gridHelper);

        return () => {
            // Remove the grid and axes helpers from the scene
            scene.remove(gridHelper);

            // Remove fog
            scene.fog = null;
        };
    }, [scene, camera, primary, background, light]);

    return null;
}