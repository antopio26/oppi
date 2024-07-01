import {MapContext} from "../providers/MapContext";
import {useContext} from "react";
import useRemotePlanner from "../hooks/RemotePlanner";

function InputCoord({ label, value = "", onChange = (e) => {}, onBlur = (e) => {}, onKeyDown = (e) => {} }) {
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


export function InputCoords({waypoint, onBlurCallback, index}) {

    const {mapMode, setMapMode, setAllCollapsed} = useContext(MapContext)
    const {waypoints, setWaypoints} = useRemotePlanner();

    return (
        <div className="coords">
            {Object.keys(waypoint.coords).map((coord, i) =>
                <InputCoord key={i} label={coord} value={waypoint.coords[coord]}
                     onChange={(e) => setWaypoints(
                         waypoints.map((wp, j) => j === index ? {
                             id: wp.id,
                             coords: {...wp.coords, [coord]: parseFloat(e)||""}
                         } : wp)
                     )}
                     onBlur={onBlurCallback}
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
                     }}
                />
            )}
        </div>
    )
}

/*
*/