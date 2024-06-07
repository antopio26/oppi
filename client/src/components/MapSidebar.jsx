import "../style/css/MapSidebar.css"

import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import ColorPicker from "./ColorPicker";
import {useContext, useEffect, useState, useRef} from "react";
import {MapContext} from "../providers/MapContext";

function InputCoordsOnBlur(e, mapMode, setMapMode) {
    if (mapMode === "point-selector" && !e.currentTarget.closest(".p-accordion-content").contains(e.relatedTarget) && e.relatedTarget?.closest(".map-sidebar")) {
        setMapMode("view")
        document.querySelectorAll(".point-selector-button").forEach(button => button.classList.remove("active"))
    }
}

export function InputCoords({
                                label, value = "", onChange = () => {
    }, onBlur = () => {
    }
                            }) {
    return (
        <div className="coord-comp">
            <div className="label">
                {label}
            </div>
            <div className="value">
                <input type="number" step={.1} value={value} onChange={(e) => onChange(e.target.value)}
                       onBlur={(e) => onBlur(e)}/>
            </div>
        </div>
    )
}

export default function MapSidebar() {
    const {waypoints, setWaypoints, mapMode, setMapMode, allCollapsed, setAllCollapsed} = useContext(MapContext);
    const nodesAccordionRef = useRef();
    const [nodesAccordionActiveIndex, setNodesAccordionActiveIndex] = useState(null);

    useEffect(() => {
        if (waypoints.length == 2 && nodesAccordionRef.current.getElement()?.closest(".removing")) {
            nodesAccordionRef.current.getElement().closest(".removing").classList.remove("removing")
        }
    }, [waypoints]);

    useEffect(() => {
        if (allCollapsed) {
            setNodesAccordionActiveIndex(null);
            setAllCollapsed(false);
        }
    }, [allCollapsed]);

    return (
        <div className="map-sidebar" onClickCapture={(e) => {
            if (mapMode === "point-selector") {
                // target is not .p-accordion-tab input
                if (!e.target.closest(".point-selector-button") && !e.target.closest(".p-accordion-content input")) {
                    setMapMode("view")
                    document.querySelectorAll(".point-selector-button").forEach(button => button.classList.remove("active"))
                }
            }
        }}>
            <div className="nodes" onClickCapture={(e) => {
                if (e.currentTarget.classList.contains("removing")) {
                    if (!e.target.closest(".p-accordion-tab")) {
                        e.currentTarget.classList.remove("removing")
                    } else {
                        e.target?.closest(".p-accordion-tab").classList.add("removing");
                        const index = Array.from(nodesAccordionRef.current.getElement().children).indexOf(e.target.closest(".p-accordion-tab"));
                        setTimeout(() => {
                            setWaypoints(waypoints.filter((wp, i) => i !== index));
                        }, 500)
                    }
                    e.stopPropagation()
                }
            }}>
                <div className="nodes-top">
                    <p className={"label"}>Nodi</p>
                    <Button icon="pi pi-plus" className={"add-button primary-text"} text rounded
                            onClick={() => {
                                setWaypoints([...waypoints, {
                                    id: waypoints[waypoints.length - 1].id + 1,
                                    coords: ["", "", ""],
                                    color: "#ff0000"
                                }]);
                                setNodesAccordionActiveIndex(waypoints.length);
                            }}/>
                    <Button icon="pi pi-minus" className={"remove-button primary-text"} disabled={waypoints.length<3} text rounded
                            onClick={(e) => {
                                setAllCollapsed(true);
                                e.currentTarget.closest(".nodes").classList.toggle("removing")
                            }}/>
                    <Button icon="pi pi-compass" className={"run-button"} rounded/>
                </div>
                <Accordion ref={nodesAccordionRef} activeIndex={nodesAccordionActiveIndex}
                           onTabChange={(e) => setNodesAccordionActiveIndex(e.index)}>
                    {waypoints.map((wp, index) =>
                        <AccordionTab key={wp.id} header={<>
                            <span className={"node-name"}>Nodo {index + 1}</span>
                            <Button icon="pi pi-bullseye" className={"point-selector-button white-text"} text rounded
                                    onFocus={() => {
                                        document.querySelectorAll(".color-picker").forEach(cp => cp.classList.remove("open"))
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.currentTarget.classList.toggle("active");
                                        setMapMode(e.currentTarget.classList.contains("active") ? "point-selector" : "view")
                                        if (e.currentTarget.classList.contains("active")) {
                                            setNodesAccordionActiveIndex(index)
                                            document.querySelectorAll(".point-selector-button").forEach((button, i) => {
                                                if (i !== index) {
                                                    button.classList.remove("active")
                                                }
                                            })
                                        }
                                    }}/>
                            <ColorPicker value={waypoints[index].color}
                                         onChange={(e) => setWaypoints(waypoints.map((wp, i) => i === index ? {
                                             id: wp.id,
                                             coords: wp.coords,
                                             color: e
                                         } : wp))}/>
                        </>}>
                            <div className="coords">
                                <InputCoords label={"x"} onBlur={(e) => InputCoordsOnBlur(e, mapMode, setMapMode)}/>
                                <InputCoords label={"y"} onBlur={(e) => InputCoordsOnBlur(e, mapMode, setMapMode)}/>
                                <InputCoords label={"z"} onBlur={(e) => InputCoordsOnBlur(e, mapMode, setMapMode)}/>
                            </div>
                        </AccordionTab>
                    )}
                </Accordion>
            </div>
        </div>
    )
}