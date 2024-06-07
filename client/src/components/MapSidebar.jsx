import "../style/css/MapSidebar.css"

import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import {ColorPicker} from "primereact/colorpicker";
import {HexColorPicker} from "react-colorful";
import {createRef, useEffect, useMemo, useState} from "react";
import {findDOMNode} from "react-dom";

export default function MapSidebar() {
    const [nodesColor, setNodesColor] = useState(["#ff0000", "#0000ff"])
    const [nodesCount, setNodesCount] = useState(2)
    const nodesRefs = useMemo(() => Array.from({length: nodesCount}, () => createRef()), [nodesCount])

    return (
        <>
            <div className="map-sidebar">
                <div className="nodes">
                    <div className="nodes-top">
                        <p className={"label"}>Nodi</p>
                        <Button icon="pi pi-plus" className={"add-button lighter-secondary-bg primary-text"} rounded/>
                    </div>
                    <Accordion>
                        {nodesRefs.map((ref, index) => <AccordionTab key={index} header={<>
                            <span className={"node-name"}>Nodo {index + 1}</span>
                            <ColorPicker ref={ref} value={nodesColor[index]}
                                         onChange={(e) => setNodesColor(nodesColor.map((color, i) => i === index ? e.value : color))}
                                         onClick={(e) => {
                                             e.preventDefault();
                                             e.stopPropagation();
                                             if (!e.target.classList.contains("open")) {
                                                 e.target.classList.add("open");
                                             } else {
                                                 e.target.blur();
                                             }
                                         }}
                                         onBlur={(e) => {
                                             if (!e.relatedTarget?.classList[0].includes("react-colorful")) {
                                                 e.target.classList.remove("open")
                                             }
                                         }}/>
                            <HexColorPicker color={nodesColor[index]}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(e) => setNodesColor(nodesColor.map((color, i) => i === index ? e : color))}
                                            onBlur={(e) => {
                                                    ref.current.getElement().querySelector("input").classList.remove("open");
                                            }}
                            />

                        </>}>
                        </AccordionTab>)}
                    </Accordion>
                </div>
            </div>
        </>
    )
}