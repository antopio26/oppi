import React, {useContext, useState} from 'react';

import '../style/css/Map.css';

import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";
import Sidebar from "../components/Sidebar";
import MapSidebar from "../components/MapSidebar";
import MapContextProvider from "../providers/MapContext";

export default function Map() {
    const [mapMode, setMapMode] = useState({mode: "view"});

    return (
        <MapContextProvider additionalStates={{mapMode, setMapMode}}>
            <Sidebar
                info={"Set a starting point, an ending point and generate a path. You can modify the path planning parameters and move within the map."}>
                <MapSidebar/>
            </Sidebar>
            <main style={{position: "relative"}} className={`map-main ${mapMode.mode}`}>
                <Canvas style={{position: "absolute", inset: 0}}>
                    { <MapScene/> }
                </Canvas>
            </main>
        </MapContextProvider>
    )
}