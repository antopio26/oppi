import "../style/css/MapSidebar.css"

import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import ColorPicker from "./ColorPicker";
import {useContext, useEffect, useState, useRef} from "react";
import {MapContext} from "../providers/MapContext";
import PointSelectorButton from "./PointSelectorButton";

function InputCoordsOnBlur(e, mapMode, setMapMode) {
    if (mapMode.mode === "point-selector" && !e.currentTarget.closest(".p-accordion-content").contains(e.relatedTarget) && e.relatedTarget?.closest(".map-sidebar")) {
        setMapMode({mode: "view"})
    }
}

export function InputCoords({
                                label, value = "", onChange = () => {
    }, onBlur = () => {
    }, onKeyDown = () => {
    }
                            }) {
    return (
        <div className="coord-comp">
            <div className="label">
                {label}
            </div>
            <div className="value">
                <input type="number" step={.1} value={value} onChange={(e) => onChange(e.target.value)}
                       onBlur={(e) => onBlur(e)} onKeyDown={(e) => onKeyDown(e)}
                />
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (mapMode.mode === "point-selector" && e.key === "Escape" && e.activeElement === undefined) {
                setMapMode({mode: "view"})
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [mapMode]);

    return (
        <div className="map-sidebar" onClickCapture={(e) => {
            if (mapMode.mode === "point-selector") {
                if (!e.target.closest(".point-selector-button") && !e.target.closest(".p-accordion-content input")) {
                    setMapMode({mode: "view"})
                }
            }
        }}
        >
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
                                    coords: {x: "", y: "", z: ""},
                                    color: "#ff0000"
                                }]);
                                setNodesAccordionActiveIndex(waypoints.length);
                            }}/>
                    <Button icon="pi pi-minus" className={"remove-button primary-text"} disabled={waypoints.length < 3}
                            text rounded
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
                            <PointSelectorButton index={index}
                                                 setNodesAccordionActiveIndex={setNodesAccordionActiveIndex}
                                                 id={wp.id}/>
                            <ColorPicker value={waypoints[index].color}
                                         onChange={(e) => setWaypoints(waypoints.map((wp, i) => i === index ? {
                                             id: wp.id,
                                             coords: wp.coords,
                                             color: e
                                         } : wp))}/>
                        </>}>
                            <div className="coords">
                                {Object.keys(wp.coords).map((coord, i) =>
                                    <InputCoords key={i} label={coord} value={wp.coords[coord]}
                                                 onChange={(e) => setWaypoints(waypoints.map((wp, j) => j === index ? {
                                                     id: wp.id,
                                                     coords: {...wp.coords, [coord]: parseFloat(e)},
                                                     color: wp.color
                                                 } : wp))}
                                                 onBlur={(e) => InputCoordsOnBlur(e, mapMode, setMapMode)}
                                                 onKeyDown={(e) => {
                                                     if (e.key === "Enter" || e.keyCode === 27) {
                                                         if (waypoints[index].coords.x && waypoints[index].coords.y && waypoints[index].coords.z) {
                                                             if (mapMode.mode === "view") {
                                                                 setAllCollapsed(true)
                                                             }
                                                             setMapMode({mode: "view"})
                                                         } else {
                                                             // find the first empty input and focus it
                                                             let found = false;
                                                             e.currentTarget.closest(".p-accordion-content").querySelectorAll("input").forEach(input => {
                                                                 if (!input.value && !found) {
                                                                     input.focus()
                                                                     found = true;
                                                                 }
                                                             })
                                                         }
                                                     }
                                                 }}/>
                                )}
                            </div>
                        </AccordionTab>
                    )}
                </Accordion>
            </div>
        </div>
    )
}