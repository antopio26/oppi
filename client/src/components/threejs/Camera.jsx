import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import * as THREE from "three";

export function Camera() {
    const {camera} = useThree();

    useEffect(() => {
        THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);
        camera.up.set(0, 0, 1);
        camera.position.set(0, 10, 5);
        camera.lookAt(0, 0, 0);

    }, [camera]);

    return null;
}