import {createContext, useState} from "react";

export const NodesColorContext = createContext('');

export default function NodeColorContextProvider({children}){
    const [nodesColor, setNodesColor] = useState(["#ff0000", "#0000ff"])

    return (
        <NodesColorContext.Provider value={{nodesColor, setNodesColor}}>
            {children}
        </NodesColorContext.Provider>
    )
} ;
