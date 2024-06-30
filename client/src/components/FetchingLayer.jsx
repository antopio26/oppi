import {useEffect} from "react";
import {useAuth0} from "@auth0/auth0-react";
import useProjectManager from "../hooks/ProjectManager";
import useMapManager from "../hooks/MapManager";

export default function FetchingLayer({children}) {
    const {isAuthenticated} = useAuth0();
    const {getMaps} = useMapManager();
    const {getProjects} = useProjectManager();

    useEffect(() => {
        if (isAuthenticated){
            getMaps();
            getProjects();
        }
    }, [isAuthenticated]);

    return(
        <>
            {children}
        </>
    )
}