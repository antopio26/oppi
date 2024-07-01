import React from "react";

export default function PathCard({path, selection}) {
    return (
        <div className="path-card">
            <span>#{path._id}</span>
            <span>Created on: {new Date(path.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</span>
            <span>Nodes: {path.waypoints.length}</span>
            <span>Length: {path.cost}m</span>
            <div className="actions">
                <i className={"pi pi-bookmark primary-text save-button " + (path.saved ? "saved" : "")}
                onClick={(e)=>{
                    if (path.saved) {
                        console.log("unsave")
                    } else {
                        console.log("save")
                    }
                }}>
                    <i className={"pi pi-bookmark-fill primary-text"}></i>
                </i>
                <i className={"pi pi-compass primary-text select-button"} tabIndex={0}></i>
            </div>
        </div>
    )
}