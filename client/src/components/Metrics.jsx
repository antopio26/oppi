import {Button} from "primereact/button";
import React from "react";

export default function Metrics() {
    return (
        <div className="metrics-container">
            <div className="metrics-top">
                <Button className="icon pi pi-list" rounded
                        onClick={(e) => e.currentTarget.classList.toggle("open")}></Button>
                <div className="label">
                    <span>Metrics</span>
                </div>
            </div>
            <div className="metrics-data">
                <div className="metric">
                    <span>Path Length</span>
                    <span>0.0 m</span>
                </div>
                <div className="metric">
                    <span>Path Time</span>
                    <span>0.0 s</span>
                </div>
                <div className="metric">
                    <span>Path Cost</span>
                    <span>0.0</span>
                </div>
            </div>
        </div>
    )
}