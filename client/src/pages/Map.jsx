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
import {Dialog} from "primereact/dialog";

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
    const navigate = useNavigate();
    const {selectedProject} = useContext(AppContext);
    const [metrics, setMetrics] = useState({});

    useEffect(()=>{
        let cost = parseFloat(smoothPath?.cost)
        cost = cost >= 0 ? parseFloat(cost.toFixed(4))+" m" : "-";
        setMetrics({...metrics, Nodes: smoothPath?.path?.length || "-", Cost: cost })
    },[smoothPath])

    return (
        <MapContextProvider additionalStates={{mapMode, setMapMode, sendParameters}}>
            {(selectedProject && voxels.positions.length === 0) && <LoadingOverlay
                message="Loading Map..."
                cancelString="Back to Dashboard"
                onCancel={() => navigate('/dashboard')}
            />}
            {!selectedProject &&
                <Dialog header="No projects loaded" draggable={false}  visible={true} closable={false}>
                    <p>
                        There are no projects loaded.
                        <br/>Please go to the <a href="/dashboard" onClick={(e)=> {
                            e.preventDefault()
                        navigate("/dashboard")
                    }}>dashboard</a> and load a project.
                    </p>
                </Dialog>}
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
                        smoothPath={smoothPath.path}
                        readyState={readyState}
                    />
                </Canvas>
                <Metrics metrics={metrics}/>
            </main>
        </MapContextProvider>
    )
}