import {createContext, useState} from "react";

export const ProjectContext = createContext({});

export default function ProjectContextProvider({ children, additionalStates={}}) {
    const [waypoints, setWaypoints] = useState([
        {id: 0, coords: {x: 1, y: 0, z: 1}}]);
    const [waypointsColor, setWaypointsColor] = useState([{id: 0, color: "#ff0000"}]);

    const [paths, setPaths] = useState([]);

    const [voxels, setVoxels] = useState({positions: [], sizes: []});
    const [rrtPaths, setRrtPaths] = useState([]);
    const [optPaths, setOptPaths] = useState([]);
    const [smoothPath, setSmoothPath] = useState({path: [], cost: -1});
    const [chronoPath, setChronoPath] = useState([]);

    const [completed, setCompleted] = useState(false);

    const [readyState, setReadyState] = useState(0);

    const [first, setFirst] = useState(true);

    return (
        <ProjectContext.Provider value={{
            waypoints,
            setWaypoints,
            waypointsColor,
            setWaypointsColor,
            paths,
            setPaths,
            voxels,
            setVoxels,
            rrtPaths,
            setRrtPaths,
            optPaths,
            setOptPaths,
            smoothPath,
            setSmoothPath,
            chronoPath,
            setChronoPath,
            completed,
            setCompleted,
            sendParameters,
            setSendParameters,
            readyState,
            setReadyState,
            first,
            setFirst,
            ...additionalStates
        }}>
            {children}
        </ProjectContext.Provider>
    )
};
