import {createContext, useEffect, useRef, useState} from "react";
import {themes, isValid} from "../hooks/Theme";

export const AppContext = createContext({});

export default function AppContextProvider({children, additionalStates={}}){
    const [currentTheme, setCurrentTheme] = useState(isValid(localStorage.getItem('theme'))? localStorage.getItem("theme"): themes[0]);

    return (
        <AppContext.Provider value={{currentTheme, setCurrentTheme, ...additionalStates}}>
            {children}
        </AppContext.Provider>
    )
} ;
