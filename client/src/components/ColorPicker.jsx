import "../style/css/ColorPicker.css";

import {useEffect, createRef, useState } from "react";
import {HexColorPicker} from "react-colorful";

export default function ColorPicker({ value ="red",onChange = ()=>{}}){
    const cpRef = createRef();
    const [color, setColor] = useState(value);

    useEffect(()=>{
        if (cpRef.current) {
            cpRef.current.style = `background-color: ${color}`;
        }
    },[cpRef])

    return(<>
        <input ref={cpRef} tabIndex={-1} className={"color-picker"} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(e.target.closest(".p-accordion-tab"))
            if (!e.target.classList.contains("open")) {
                //close all other color pickers
                document.querySelectorAll(".color-picker").forEach(cp => cp.classList.remove("open"));
                e.target.classList.add("open");
            } else {
                e.target.blur();
            }
        }}
               onBlurCapture={(e) => {
                   if (!e.relatedTarget?.closest(".react-colorful")) {
                       e.target.classList.remove("open")
                       return;
                   }
                   e.currentTarget.focus()
               }}
        />
        <HexColorPicker color={color}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setColor(e)
                            onChange(e)
                        }}
        />
        </>);
}