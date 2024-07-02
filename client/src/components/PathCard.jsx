import React, {useContext} from "react";
import useProjectManager from "../hooks/ProjectManager";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../providers/AppContext";
import useRemotePlanner from "../hooks/RemotePlanner";

export default function PathCard({path, selection}) {
    const {setWaypoints, setWaypointsColor} = useRemotePlanner();
    const {savePath, unsavePath} = useProjectManager();
    const navigate = useNavigate();
    return (
        <div className="path-card">
            {/*<span>#{path._id}</span>*/}
            <span>Created on: {new Date(path.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric"
            })}</span>
            <span>Nodes: {path.waypoints.length}</span>
            <span>Length: {path.cost}m</span>
            <div className="actions">
                <i className={"pi pi-bookmark primary-text save-button " + (path.saved ? "saved" : "")}
                onClick={(e)=>{
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
                        setWaypoints(path.waypoints)
                        setWaypointsColor(path.waypointsColor)
                        navigate("/map")
                    }
                }></i>
            </div>
        </div>
    )
}