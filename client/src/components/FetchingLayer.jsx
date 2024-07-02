import {useContext, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import useProjectManager from "../hooks/ProjectManager";
import useMapManager from "../hooks/MapManager";
import useRemotePlanner from "../hooks/RemotePlanner";
import {AppContext} from "../providers/AppContext";

export default function FetchingLayer({children}) {
    const {isAuthenticated} = useAuth0();
    const {getMaps} = useMapManager();
    const {getProjects, getPaths, createPath} = useProjectManager();
    const {selectedProject, currentPath, setCurrentPath} = useContext(AppContext);

    const {resetPlanner, sendParameters, changeMap, voxels, waypoints, waypointsColor, smoothPath} = useRemotePlanner();

    useEffect(() => {
        if (isAuthenticated){
            getMaps();
            getProjects()
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (selectedProject){
            getPaths(selectedProject._id).then(paths => {
                setCurrentPath(paths.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]);
            })


            resetPlanner();
            sendParameters(selectedProject.parameters);
            changeMap(selectedProject.map);
        }
    }, [selectedProject?._id]);

    useEffect(() => {
        if (voxels.positions.length === 0 || waypoints.length < 2) {
            return;
        }

        if (JSON.stringify(currentPath?.waypoints)!==JSON.stringify(waypoints)) {
            setCurrentPath(null);
        }

        const timeout = setTimeout(async () => {
            const path = await createPath(selectedProject._id, {
                waypoints,
                waypointsColor,
                cost: smoothPath.cost,
                smoothPath: smoothPath.path
            })
            setCurrentPath(path);
        }, 6000);

        return () => clearTimeout(timeout);
    }, [waypoints, waypointsColor]);


    return(
        <>
            {children}
        </>
    )
}