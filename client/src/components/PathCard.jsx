import React, {useContext, useEffect} from "react";
import useProjectManager from "../hooks/ProjectManager";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../providers/AppContext";
import useRemotePlanner from "../hooks/RemotePlanner";

export default function PathCard({path, selection}) {
    const {setWaypoints, setWaypointsColor, setSmoothPath} = useRemotePlanner();
    const {savePath, unsavePath, updateLastOpenAt} = useProjectManager();
    const navigate = useNavigate();
    const {setCurrentPath} = useContext(AppContext);

    return (
        <div className="path-card">
            <div className={"data"}>
                <span className={"no-colons"}>#</span><span>{path._id}</span>
            </div>
            <div className={"data"}>
            <span>Created on</span><span>{new Date(path.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
            })}</span>
            </div>
            <div className={"data"}>
            <span>Nodes</span><span>{path.waypoints.length}</span>
            </div>
                <div className={"data"}>
            <span>Length</span><span>{path.cost}m</span>
                </div>
            <div className="actions">
                <i className={"pi pi-bookmark primary-text save-button " + (path.saved ? "saved" : "")}
                   onClick={(e) => {
                       if (path.saved) {
                           unsavePath(path.project, path._id)
                       } else {
                           savePath(path.project, path._id)
                       }
                   }}>
                    <i className={"pi pi-bookmark-fill primary-text"}></i>
                </i>
                <i className={"pi pi-compass primary-text select-button"} tabIndex={0} onClick={
                    (e) => {

                        setWaypoints(path.waypoints);
                        setWaypointsColor(path.waypointsColor)
                        setCurrentPath(path);
                        setSmoothPath({path: path.smoothPath, cost: path.cost})
                        updateLastOpenAt(path.project)
                        navigate("/map")
                    }
                }></i>
            </div>
        </div>
    )
}