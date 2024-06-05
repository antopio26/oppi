import React from 'react';

import { Canvas } from "@react-three/fiber";
import MapScene from "../components/MapScene";

import useRemotePlanner from "../hooks/RemotePlanner";

export default function Map() {

    const { readyState, voxels, endpoints, nodes, optPath, smoothPath } = useRemotePlanner();

    return (
        <main>
            <Canvas style={{position: "absolute", inset: 0, zIndex: -1}}>
                { <MapScene
                    connection={readyState}
                    voxels={voxels}
                    endpoints={endpoints}
                    nodes={nodes}
                    optPath={optPath.path}
                    smoothPath={smoothPath.path}
                /> }
            </Canvas>
        </main>
    )
}