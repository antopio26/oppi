import {useThree} from "@react-three/fiber";
import useTheme from "../../hooks/Theme";
import {useEffect} from "react";
import * as THREE from "three";

export function Helpers() {
    const { scene, camera } = useThree();
    const { primary, background, light } = useTheme();

    useEffect(() => {
        if (primary === "") return;

        // Add fog to the scene
        scene.fog = new THREE.Fog(background, 5, 40);

        // Add a grid helper to the scene
        const gridHelper = new THREE.GridHelper(100, 100, primary, light);
        gridHelper.rotation.x = Math.PI / 2;
        gridHelper.name = "gridHelper"
        scene.add(gridHelper);

        return () => {
            // Remove the grid and axes helpers from the scene
            scene.remove(gridHelper);

            // Remove fog
            scene.fog = null;
        };
    }, [scene, primary, background, light]);

    return null;
}