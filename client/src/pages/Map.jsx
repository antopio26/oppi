import React, {useContext, useEffect, useRef, useState} from 'react';

import '../style/css/Map.css';

import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";
import Sidebar from "../components/Sidebar";
import MapSidebar from "../components/MapSidebar";
import MapContextProvider from "../providers/MapContext";
import Metrics from "../components/Metrics";
import useRemotePlanner from "../hooks/RemotePlanner";
import LoadingOverlay from "../components/LoadingOverlay";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../providers/AppContext";
import useProjectManager from "../hooks/ProjectManager";

export default function Map() {
    const [mapMode, setMapMode] = useState({mode: "view"});
    const {
        waypoints,
        waypointsColor,
        readyState,
        voxels,
        rrtPaths,
        optPaths,
        smoothPath,
        sendParameters
    } = useRemotePlanner();
    const {createPath} = useProjectManager();
    const navigate = useNavigate();
    const {selectedProject, currentPath, setCurrentPath} = useContext(AppContext);

    const currentPathRef = useRef(null);
    currentPathRef.current = currentPath;

    return (
        <MapContextProvider additionalStates={{mapMode, setMapMode, sendParameters}}>
            {voxels.positions.length === 0 && <LoadingOverlay
                message="Loading Map..."
                cancelString="Back to Dashboard"
                onCancel={() => navigate('/dashboard')}
            />}
            <Sidebar
                info={"Set a starting point, an ending point and generate a path. You can modify the path planning parameters and move within the map."}>
                <MapSidebar/>
            </Sidebar>
            <main style={{position: "relative"}} className={`map-main ${mapMode.mode}`}>
                <h3>{selectedProject?.name}</h3>
                <Canvas style={{position: "absolute", inset: 0}}>
                    <MapScene
                        waypoints={waypoints}
                        waypointsColor={waypointsColor}
                        voxels={voxels}
                        rrtPaths={rrtPaths}
                        optPaths={optPaths}
                        smoothPath={smoothPath}
                        readyState={readyState}
                    />
                </Canvas>
                <Metrics/>
            </main>
        </MapContextProvider>
    )
}