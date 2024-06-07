import React, {useContext, useState} from 'react';

import '../style/css/Map.css';

import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";

import useRemotePlanner from "../hooks/RemotePlanner";
import Sidebar from "../components/Sidebar";
import MapSidebar from "../components/MapSidebar";
import MapContextProvider from "../providers/MapContext";

export default function Map() {
    const [mapMode, setMapMode] = useState("view");
    const [allCollapsed, setAllCollapsed] = useState(false);



    const {
        readyState,
        voxels,
        endpoints, nodes,
        optPath,
        smoothPath
    } = useRemotePlanner('ws://localhost:9002');

    return (
            <MapContextProvider states={{mapMode,setMapMode,allCollapsed,setAllCollapsed}}>
            <Sidebar info={"Imposta un punto di partenza, un punto di arrivo e genera un percorso. Puoi modificare i parametri del path planning o muoverti all'interno della mappa."}>
                <MapSidebar />
            </Sidebar>
            <main style={{position: "relative"}} className={`map-main ${mapMode}`}>
                <Canvas style={{position: "absolute", inset: 0}}>
                    {<MapScene
                        connection={readyState}
                        voxels={voxels}
                        endpoints={endpoints}
                        nodes={nodes}
                        optPath={optPath.path}
                        smoothPath={smoothPath.path}
                    />}
                </Canvas>
            </main>
            </MapContextProvider>
    )
}