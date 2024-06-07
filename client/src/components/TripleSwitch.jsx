import "../style/css/TripleSwitch.css";
import {useState} from "react";

export default function TripleSwitch({
                                         className = "",
                                         colors = {left: "white", center: "white", right: "white"},
                                         labels = {
                                             left: {
                                                 title: "left",
                                                 value: "left"
                                             },
                                             center: {
                                                 title: "center",
                                                 value: "center"
                                             },
                                             right: {
                                                 title: "right",
                                                 value: "right"
                                             }
                                         },
                                         onChange = (value) => {
                                         },
                                         selected = "left"
                                     }) {
    const hexToRgb = (hex) => {
        let r, g, b;
        r=parseInt(hex.substring(1,3), 16);
        g=parseInt(hex.substring(3,5), 16);
        b=parseInt(hex.substring(5,7), 16);
        return {r:r, g:g, b:b};
    };
    let rgbColorsVariables = Object.keys(hexToRgb(colors.left)).map((key) => `--left-${key}: ${hexToRgb(colors.left)[key]}`);
    rgbColorsVariables = rgbColorsVariables.concat(Object.keys(hexToRgb(colors.center)).map((key) => `--center-${key}: ${hexToRgb(colors.center)[key]}`));
    rgbColorsVariables = rgbColorsVariables.concat(Object.keys(hexToRgb(colors.right)).map((key) => `--right-${key}: ${hexToRgb(colors.right)[key]}`));
    rgbColorsVariables = rgbColorsVariables.reduce((acc, curr) => {
        acc[curr.split(":")[0]] = curr.split(":")[1];
        return acc;
    }, {});
    const [switchPosition, setSwitchPosition] = useState(Object.keys(labels).find(key => labels[key].value === selected));
    const [animation, setAnimation] = useState(null);
    const [selectedColor, setSelectedColor] = useState(colors[switchPosition]);

    const getSwitchAnimation = (value) => {
        let newAnimation = null;
        if (value === "center" && switchPosition === "left") {
            newAnimation = "left-to-center";
        } else if (value === "right" && switchPosition === "center") {
            newAnimation = "center-to-right";
        } else if (value === "center" && switchPosition === "right") {
            newAnimation = "right-to-center";
        } else if (value === "left" && switchPosition === "center") {
            newAnimation = "center-to-left";
        } else if (value === "right" && switchPosition === "left") {
            newAnimation = "left-to-right";
        } else if (value === "left" && switchPosition === "right") {
            newAnimation = "right-to-left";
        }
        onChange(labels[value].value);
        setSelectedColor(colors[value])
        setSwitchPosition(value);
        setAnimation(newAnimation);
    };

    return (
        <div className={`triple-switch ${className}`} style={Object.assign(rgbColorsVariables,{"--selected-color": selectedColor,})}>
            <div className={`switch ${animation} ${switchPosition}-position`}/>
            <input
                onChange={(e) => getSwitchAnimation(e.target.value)}
                name="map-switch"
                id="left"
                type="radio"
                value="left"
            />
            <label
                className={`left-label ${switchPosition === "left" ? "black-font" : ""}`}
                htmlFor="left"
            >
                <h4>{labels.left.title}</h4>
            </label>

            <input
                onChange={(e) => getSwitchAnimation(e.target.value)}
                name="map-switch"
                id="center"
                type="radio"
                value="center"
            />
            <label
                className={`center-label ${switchPosition === "center" ? "black-font" : ""}`}
                htmlFor="center"
            >
                <h4>{labels.center.title}</h4>
            </label>

            <input
                onChange={(e) => getSwitchAnimation(e.target.value)}
                name="map-switch"
                id="right"
                type="radio"
                value="right"
            />
            <label
                className={`right-label ${switchPosition === "right" ? "black-font" : ""}`}
                htmlFor="right"
            >
                <h4>{labels.right.title}</h4>
            </label>
        </div>
    );
}