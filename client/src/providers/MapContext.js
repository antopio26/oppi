import {createContext, useState} from "react";

export const MapContext = createContext('');

export default function MapContextProvider({children, states = {}}) {
    const [nodesColor, setNodesColor] = useState(["#ff0000", "#0000ff"]);

    return (
        <MapContext.Provider value={Object.assign({nodesColor, setNodesColor},states)}>
            {children}
        </MapContext.Provider>
    )
} ;
