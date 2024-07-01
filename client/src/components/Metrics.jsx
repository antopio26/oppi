import {Button} from "primereact/button";
import React from "react";

export default function Metrics({metrics}) {
    if (!metrics) return null;

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
                {metrics.keys().map((key, i) => (
                    <div className="metric" key={i}>
                        <span>{key}</span>
                        <span>{metrics[key]}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}