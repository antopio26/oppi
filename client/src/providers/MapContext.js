import {createContext, useState} from "react";
import useRemotePlanner from "../hooks/RemotePlanner";

export const MapContext = createContext({});

export default function MapContextProvider({ children, additionalStates={}}) {
    const [waypoints, setWaypoints] = useState([
        {id: 0, coords: {x: 1, y: 0, z: 1}}]);
    const [waypointsColor, setWaypointsColor] = useState([{id: 0, color: "#ff0000"}]);
    const [allCollapsed, setAllCollapsed] = useState(false);

    return (
        <MapContext.Provider value={{
            waypoints: waypoints,
            setWaypoints: setWaypoints,
            waypointsColor: waypointsColor,
            setWaypointsColor: setWaypointsColor,
            allCollapsed: allCollapsed,
            setAllCollapsed: setAllCollapsed,
            ...additionalStates
        }}>
            {children}
        </MapContext.Provider>
    )
};
