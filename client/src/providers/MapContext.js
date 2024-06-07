import {createContext, useState} from "react";

export const MapContext = createContext('');

export default function MapContextProvider({children, states = {}}) {
    const [waypoints, setWaypoints] = useState([{id:0,coords:{x:"",y:"",z:""},color:"#ff0000"}, {id:1,coords:{x:"",y:"",z:""},color:"#0000ff"}]);

    return (
        <MapContext.Provider value={Object.assign({waypoints: waypoints, setWaypoints: setWaypoints},states)}>
            {children}
        </MapContext.Provider>
    )
} ;
