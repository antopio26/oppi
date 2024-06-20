import React, {useContext, useState} from 'react';

import '../style/css/Map.css';

import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";
import Sidebar from "../components/Sidebar";
import MapSidebar from "../components/MapSidebar";
import MapContextProvider from "../providers/MapContext";
import {Button} from "primereact/button";

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
                    {<MapScene/>}
                </Canvas>
                <div className="metrics-container">
                    <div className="metrics-top">
                        <Button className="icon pi pi-list" rounded
                                onClick={(e) => e.currentTarget.classList.toggle("open")}></Button>
                        <div className="label">
                            <span>Metrics</span>
                        </div>
                    </div>
                    <div className="metrics-data">
                        <div className="metric">
                            <span>Path Length</span>
                            <span>0.0 m</span>
                        </div>
                        <div className="metric">
                            <span>Path Time</span>
                            <span>0.0 s</span>
                        </div>
                        <div className="metric">
                            <span>Path Cost</span>
                            <span>0.0</span>
                        </div>
                    </div>
                </div>
            </main>
        </MapContextProvider>
    )
}