import {createContext, useEffect, useRef, useState} from "react";
import {themes, isValid} from "../hooks/Theme";
import axios from "axios";

export const AppContext = createContext({});

export default function AppContextProvider({children, additionalStates = {}}) {
    const [currentTheme, setCurrentTheme] = useState(isValid(localStorage.getItem('theme')) ? localStorage.getItem("theme") : themes[0]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [maps, setMaps] = useState([]);
    const toastRef = useRef(null);

    return (
        <AppContext.Provider value={{currentTheme, setCurrentTheme, toastRef, selectedProject, setSelectedProject, projects, setProjects, maps, setMaps, ...additionalStates}}>
            {children}
        </AppContext.Provider>
    )
};
