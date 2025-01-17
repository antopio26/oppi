import {Button} from "primereact/button";
import {useContext, useEffect} from "react";
import {MapContext} from "../providers/MapContext";

export default function PointSelectorButton({setActiveIndex, index, id}) {
    const { mapMode, setMapMode } = useContext(MapContext)

    return <Button icon="pi pi-bullseye" className={"point-selector-button white-text" + (mapMode.mode === "point-selector" && mapMode.point === id ? " active" : "")}
               text rounded onFocus={() => {
                    document.querySelectorAll(".color-picker").forEach(cp => cp.classList.remove("open"))
               }}
               onClick={(e) => {
                   e.stopPropagation()
                   e.currentTarget.classList.toggle("active");
                   setMapMode(e.currentTarget.classList.contains("active") ? {
                       mode: "point-selector",
                       point: id
                   } : {mode: "view"})
                   if (e.currentTarget.classList.contains("active")) {
                       setActiveIndex(index)
                       document.querySelectorAll(".point-selector-button").forEach((button, i) => {
                           if (i !== index) {
                               button.classList.remove("active")
                           }
                       })
                   }
               }}/>
}