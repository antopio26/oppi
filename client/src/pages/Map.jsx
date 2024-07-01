import React, {useContext, useState} from 'react';

import '../style/css/Map.css';

import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";
import Sidebar from "../components/Sidebar";
import MapSidebar from "../components/MapSidebar";
import MapContextProvider, {MapContext} from "../providers/MapContext";
import Metrics from "../components/Metrics";
import useRemotePlanner from "../hooks/RemotePlanner";
import LoadingOverlay from "../components/LoadingOverlay";
import {useNavigate} from "react-router-dom";

export default function Map() {
    const [mapMode, setMapMode] = useState({mode: "view"});
    const [waypoints, setWaypoints] = useState([{id: 0, coords: {x: 1, y: 0, z: 1}}]);
    const [waypointsColor, setWaypointsColor] = useState([{id: 0, color: "#ff0000"}]);
    const { readyState, voxels, rrtPaths, optPaths, smoothPath, sendParameters } = useRemotePlanner('ws://localhost:9002', waypoints);
    const navigate = useNavigate();


    return (
        <MapContextProvider additionalStates={{mapMode, setMapMode, waypoints, setWaypoints, waypointsColor, setWaypointsColor, sendParameters}}>
            { voxels.positions.length === 0 && <LoadingOverlay
                message="Loading Map..."
                cancelString="Back to Dashboard"
                onCancel={() => navigate('/dashboard')}
            /> }
            <Sidebar
                info={"Set a starting point, an ending point and generate a path. You can modify the path planning parameters and move within the map."}>
                <MapSidebar/>
            </Sidebar>
            <main style={{position: "relative"}} className={`map-main ${mapMode.mode}`}>
                <Canvas style={{position: "absolute", inset: 0}}>
                    {<MapScene
                        waypoints={waypoints}
                        waypointsColor={waypointsColor}
                        voxels={voxels}
                        rrtPaths={rrtPaths}
                        optPaths={optPaths}
                        smoothPath={smoothPath}
                        readyState={readyState}
                    />}
                </Canvas>
                <Metrics/>
            </main>
        </MapContextProvider>
    )
}