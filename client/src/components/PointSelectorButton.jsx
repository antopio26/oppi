import {Button} from "primereact/button";

export default function PointSelectorButton({mapMode, setMapMode, setNodesAccordionActiveIndex, index, id}) {
    return <Button icon="pi pi-bullseye" className={"point-selector-button white-text" + (mapMode.mode === "point-selector" && mapMode.point === id ? " active" : "")}
                   text rounded onFocus={() => {
        document.querySelectorAll(".color-picker").forEach(cp => cp.classList.remove("open"))
    }}
                   onClick={(e) => {
                       e.stopPropagation()
                       e.currentTarget.classList.toggle("active");
                       setMapMode(e.currentTarget.classList.contains("active") ? {
                           mode: "point-selector",
                           point: index
                       } : {mode: "view"})
                       if (e.currentTarget.classList.contains("active")) {
                           setNodesAccordionActiveIndex(index)
                           document.querySelectorAll(".point-selector-button").forEach((button, i) => {
                               if (i !== index) {
                                   button.classList.remove("active")
                               }
                           })
                       }
                   }}/>
}