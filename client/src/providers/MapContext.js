import {createContext, useState} from "react";
import useRemotePlanner from "../hooks/RemotePlanner";

export const MapContext = createContext('');

export default function MapContextProvider({children, states = {}}) {
    const [waypoints, setWaypoints] = useState([{id:0,coords:{x:1,y:1,z:1},color:"#ff0000"}, {id:1,coords:{x:2,y:1,z:1},color:"#0000ff"}]);
    const {
        readyState,
        voxels,
        nodes,
        optPath,
        smoothPath
    } = useRemotePlanner('ws://localhost:9002', waypoints);
    return (
        <MapContext.Provider value={Object.assign({waypoints: waypoints, setWaypoints: setWaypoints, connection: readyState, voxels: voxels, nodes: nodes, optPath: optPath, smoothPath: smoothPath}, states)}>
            {children}
        </MapContext.Provider>
    )
} ;
