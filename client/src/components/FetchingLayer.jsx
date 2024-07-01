import {useContext, useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import useProjectManager from "../hooks/ProjectManager";
import useMapManager from "../hooks/MapManager";
import useRemotePlanner from "../hooks/RemotePlanner";
import {AppContext} from "../providers/AppContext";

export default function FetchingLayer({children}) {
    const {isAuthenticated} = useAuth0();
    const {getMaps} = useMapManager();
    const {getProjects, getPaths} = useProjectManager();
    const {selectedProject} = useContext(AppContext);

    useRemotePlanner('ws://localhost:9002');

    useEffect(() => {
        if (isAuthenticated){
            getMaps();
            getProjects()
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (selectedProject){
            getPaths(selectedProject._id);
        }
    }, [selectedProject?._id]);

    return(
        <>
            {children}
        </>
    )
}