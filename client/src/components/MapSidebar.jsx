import "../style/css/MapSidebar.css"

import {Accordion, AccordionTab} from "primereact/accordion";
import {Button} from "primereact/button";
import ColorPicker from "./ColorPicker";
import {useContext, useEffect, useState, useRef } from "react";
import {NodesColorContext} from "../providers/MapContext";
import {log} from "three/examples/jsm/nodes/math/MathNode";

export default function MapSidebar() {
    const [nodesCount, setNodesCount] = useState(2);
    const {nodesColor, setNodesColor} = useContext(NodesColorContext);
    const nodesAccordionRef = useRef();
    const [nodesAccordionActiveIndex, setNodesAccordionActiveIndex] = useState(null);

    useEffect(()=>{
        if(nodesCount>nodesColor.length){
            const diff = nodesCount - nodesColor.length;
            setNodesColor([...nodesColor, ...Array(diff).fill("#ff0000")])
        }
    },[nodesCount])

    return (
            <div className="map-sidebar">
                <div className="nodes">
                    <div className="nodes-top">
                        <p className={"label"}>Nodi</p>
                        <Button icon="pi pi-plus" className={"add-button primary-text"} text rounded
                        onClick={()=> {
                            setNodesCount(nodesCount + 1);
                            setNodesAccordionActiveIndex(nodesCount)
                        }}/>
                    </div>
                    <Accordion ref={nodesAccordionRef} activeIndex={nodesAccordionActiveIndex} onTabChange={(e) => setNodesAccordionActiveIndex(e.index)}>
                        { [...Array(nodesCount)].map((_, index) =>
                            <AccordionTab key={index} header={<>
                        <span className={"node-name"}>Nodo {index + 1}</span>
                        <ColorPicker value={nodesColor[index]}
                                     onChange={(e) => setNodesColor(nodesColor.map((color, i) => i === index ? e.value : color))}
                        />
                    </>}>
                    </AccordionTab>
                        )}
                    </Accordion>
                </div>
            </div>
    )
}