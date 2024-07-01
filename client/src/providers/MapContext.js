import {createContext, useState} from "react";

export const MapContext = createContext({});

export default function MapContextProvider({ children, additionalStates={}}) {
    const [allCollapsed, setAllCollapsed] = useState(false);

    return (
        <MapContext.Provider value={{
            allCollapsed,
            setAllCollapsed,
            ...additionalStates
        }}>
            {children}
        </MapContext.Provider>
    )
};
