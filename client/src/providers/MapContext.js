import {createContext, useState} from "react";

export const MapContext = createContext('');

export default function MapContextProvider({children, states = {}}) {
    const [waypoints, setWaypoints] = useState([{id:0,coords:["","",""],color:"#ff0000"}, {id:1,coords:["","",""],color:"#0000ff"}]);

    return (
        <MapContext.Provider value={Object.assign({waypoints: waypoints, setWaypoints: setWaypoints},states)}>
            {children}
        </MapContext.Provider>
    )
} ;
