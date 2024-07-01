import "../style/css/MapSidebar.css"

import {useContext, useEffect, useState, useRef} from "react";
import {MapContext} from "../providers/MapContext";
import {NodeList} from "./NodeList";
import {ParametersList} from "./ParametersList";

export default function MapSidebar() {
    const {mapMode, setMapMode} = useContext(MapContext)

    const handleSelectionMode = (e) => {
        if (mapMode.mode === "point-selector") {
            if (!e.target.closest(".point-selector-button") && !e.target.closest(".p-accordion-content input")) {
                setMapMode({mode: "view"})
            }
        }
    }

    return (
        <div className="map-sidebar" onClickCapture={handleSelectionMode}>
            <NodeList/>
            <ParametersList/>
        </div>
    )
}