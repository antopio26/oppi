import {Accordion, AccordionTab} from "primereact/accordion";
import PointSelectorButton from "./PointSelectorButton";
import ColorPicker from "./ColorPicker";
import {InputCoords} from "./InputCoords";
import {useContext, useEffect, useRef, useState} from "react";
import {MapContext} from "../providers/MapContext";
import {Button} from "primereact/button";

export function NodeList() {
    const nodesAccordionRef = useRef();
    const [nodesAccordionActiveIndex, setNodesAccordionActiveIndex] = useState(null);

    const {
        waypoints,
        setWaypoints,
        waypointsColor,
        setWaypointsColor,
        mapMode,
        setMapMode,
        allCollapsed,
        setAllCollapsed
    } = useContext(MapContext);

    const inputCoordsOnBlur = (e) => {
        if (mapMode.mode === "point-selector" && !e.currentTarget.closest(".p-accordion-content").contains(e.relatedTarget) && e.relatedTarget?.closest(".map-sidebar") && e.relatedTarget?.closest(".point-selector-button")) {
            setMapMode({mode: "view"})
        }
    }

    const handleAddNode = () => {
        setWaypoints([...waypoints, {
            id: waypoints[waypoints.length - 1].id + 1,
            coords: {x: 0, y: 0, z: 1}
        }]);
        setWaypointsColor([...waypointsColor, {
            id: waypoints[waypoints.length - 1].id + 1,
            color: "#ff0000"
        }]);
        setNodesAccordionActiveIndex(waypoints.length);
    }

    const handleRemoveNode = (e) => {
        setAllCollapsed(true);
        e.currentTarget.closest(".nodes").classList.toggle("removing")
    }

    const handleRemoving = (e) => {
        if (e.currentTarget.classList.contains("removing")) {
            if (!e.target.closest(".p-accordion-tab")) {
                e.currentTarget.classList.remove("removing")
            } else {
                e.target?.closest(".p-accordion-tab").classList.add("removing");
                const index = Array.from(nodesAccordionRef.current.getElement().children).indexOf(e.target.closest(".p-accordion-tab"));
                setTimeout(() => {
                    setWaypoints(waypoints.filter((wp, i) => i !== index));
                    setWaypointsColor(waypointsColor.filter((c) => c.id !== waypoints[index].id));
                }, 500)
            }
            e.stopPropagation()
        }
    }

    useEffect(() => {
        if (waypoints.length === 2 && nodesAccordionRef.current.getElement()?.closest(".removing")) {
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
        <div className="nodes" onClickCapture={handleRemoving}>
            <div className="nodes-top">
                <p className={"label"}>Nodes</p>
                <Button icon="pi pi-plus" className={"add-button primary-text"} text rounded
                        onClick={handleAddNode}/>
                <Button icon="pi pi-minus" className={"remove-button primary-text"} disabled={waypoints.length < 3}
                        text rounded
                        onClick={handleRemoveNode}/>
                <Button icon="pi pi-compass" className={"run-button"} rounded/>
            </div>

            <Accordion ref={nodesAccordionRef} activeIndex={nodesAccordionActiveIndex}
                       onTabChange={(e) => setNodesAccordionActiveIndex(e.index)}>
                {waypoints.map((wp, index) =>
                    <AccordionTab key={wp.id} header={
                        <>
                            <span className={"node-name"}>Node {index + 1}</span>
                            <PointSelectorButton index={index}
                                                 setActiveIndex={setNodesAccordionActiveIndex}
                                                 id={wp.id}/>
                            <ColorPicker value={waypointsColor.find((c) => c.id === wp.id)?.color || "#ff0000"}
                                         onChange={(e) => setWaypointsColor(waypointsColor.map((c) => c.id === wp.id ? {
                                             id: c.id,
                                             color: e
                                         } : c))
                                         }/>
                        </>
                    }>
                        <InputCoords waypoint={wp} onBlurCallback={inputCoordsOnBlur} index={index}/>
                    </AccordionTab>
                )}
            </Accordion>
        </div>
    )
}