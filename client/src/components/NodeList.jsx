import {Accordion, AccordionTab} from "primereact/accordion";
import PointSelectorButton from "./PointSelectorButton";
import ColorPicker from "./ColorPicker";
import {InputCoords} from "./InputCoords";
import {useContext, useEffect, useRef, useState} from "react";
import {MapContext} from "../providers/MapContext";
import {Button} from "primereact/button";
import useRemotePlanner from "../hooks/RemotePlanner";
import {AppContext} from "../providers/AppContext";
import useProjectManager from "../hooks/ProjectManager";

export function NodeList() {
    const nodesAccordionRef = useRef();
    const [nodesAccordionActiveIndex, setNodesAccordionActiveIndex] = useState(null);

    const{
        waypoints,
        setWaypoints,
        waypointsColor,
        setWaypointsColor,
        smoothPath,
    } = useRemotePlanner();

    const {
        mapMode,
        setMapMode,
        allCollapsed,
        setAllCollapsed
    } = useContext(MapContext);

    const {selectedProject, currentPath, setCurrentPath} = useContext(AppContext);
    const {createPath, savePath, unsavePath} = useProjectManager();

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

    const handleSavePath = async (e) => {
        if(currentPath) {
            if (currentPath.saved) {
                setCurrentPath(await unsavePath(selectedProject._id, currentPath._id));
            } else {
                setCurrentPath(await savePath(selectedProject._id, currentPath._id));
            }
        } else {
            const path = await createPath(selectedProject._id, {
                waypoints,
                waypointsColor,
                // cost: smoothPath.cost,
                smoothPath: smoothPath.path,
                saved: true
            })

            setCurrentPath(path);
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
        <div className="nodes section" onClickCapture={handleRemoving}>
            <div className="section-top">
                <p className={"label"}>Nodes</p>
                <Button icon="pi pi-plus" className={"add-button primary-text"} text rounded
                        onClick={handleAddNode}/>
                <Button icon="pi pi-minus" className={"remove-button primary-text"} disabled={waypoints.length < 3}
                        text rounded
                        onClick={handleRemoveNode}/>
                <Button icon={"pi pi-bookmark" + (currentPath?.saved ? "-fill":"")} className={"save-button"} text rounded disabled={waypoints.length < 2}
                onClick={handleSavePath}/>
            </div>

            <Accordion ref={nodesAccordionRef} className={"section-content"} activeIndex={nodesAccordionActiveIndex}
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