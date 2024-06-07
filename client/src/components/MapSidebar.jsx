import "../style/css/MapSidebar.css"

import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import ColorPicker from "./ColorPicker";
import {useContext, useEffect, useState, useRef} from "react";
import {MapContext} from "../providers/MapContext";

export default function MapSidebar() {
    const [nodesCount, setNodesCount] = useState(2);
    const {nodesColor, setNodesColor, mapMode, setMapMode, allCollapsed, setAllCollapsed} = useContext(MapContext);
    const nodesAccordionRef = useRef();
    const [nodesAccordionActiveIndex, setNodesAccordionActiveIndex] = useState(null);

    useEffect(() => {
        if (nodesCount > nodesColor.length) {
            const diff = nodesCount - nodesColor.length;
            setNodesColor([...nodesColor, ...Array(diff).fill("#ff0000")])
        }
    }, [nodesCount])

    useEffect(() => {
        if(allCollapsed){
            setNodesAccordionActiveIndex(null);
            setAllCollapsed(false);
        }
    },[allCollapsed]);

    return (
        <div className="map-sidebar" onClickCapture={(e)=>{
            if(mapMode === "point-selector"){
                if(!e.target.closest(".point-selector-button")) {
                    setMapMode("view")
                    document.querySelectorAll(".point-selector-button").forEach(button => button.classList.remove("active"))
                }
            }
        }}>
            <div className="nodes">
                <div className="nodes-top">
                    <p className={"label"}>Nodi</p>
                    <Button icon="pi pi-plus" className={"add-button primary-text"} text rounded
                            onClick={() => {
                                setNodesCount(nodesCount + 1);
                                setNodesAccordionActiveIndex(nodesCount)
                            }}/>
                </div>
                <Accordion ref={nodesAccordionRef} activeIndex={nodesAccordionActiveIndex}
                           onTabChange={(e) => setNodesAccordionActiveIndex(e.index)}>
                    {[...Array(nodesCount)].map((_, index) =>
                        <AccordionTab key={index} header={<>
                            <span className={"node-name"}>Nodo {index + 1}</span>
                            <Button icon="pi pi-bullseye" className={"point-selector-button white-text"} text rounded
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
                            <ColorPicker value={nodesColor[index]}
                                         onChange={(e) => setNodesColor(nodesColor.map((color, i) => i === index ? e.value : color))}
                            />
                        </>}>
                            <div className="coords">
                                <div className="coord-comp">
                                    <div className="label">
                                        x
                                    </div>
                                    <div className="value">
                                        <input type="number" step={.1} />
                                    </div>
                                </div>
                                <div className="coord-comp">
                                    <div className="label">
                                        y
                                    </div>
                                    <div className="value">
                                        <input type="number" step={.1} />
                                    </div>
                                </div>
                                <div className="coord-comp">
                                    <div className="label">
                                        z
                                    </div>
                                    <div className="value">
                                        <input type="number" step={.1} />
                                    </div>
                                </div>
                            </div>
                        </AccordionTab>
                    )}
                </Accordion>
            </div>
        </div>
    )
}