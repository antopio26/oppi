import {useThree} from "@react-three/fiber";
import {useEffect} from "react";

export function Camera() {
    const { camera } = useThree();

    useEffect(() => {
        camera.up.set(0, 0, 1);
        camera.position.set(0, 10, 5);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return null;
}