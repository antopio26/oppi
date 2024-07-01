import {createContext, useEffect, useRef, useState} from "react";
import {themes, isValid} from "../hooks/Theme";
import axios from "axios";

export const AppContext = createContext();

export default function AppContextProvider({children, additionalStates = {}}) {
    const [currentTheme, setCurrentTheme] = useState(isValid(localStorage.getItem('theme')) ? localStorage.getItem("theme") : themes[0]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [maps, setMaps] = useState([]);
    const [projects, setProjects] = useState([]);
    const [paths, setPaths] = useState([]);
    const [currentPath, setCurrentPath] = useState(null);

    return (
        <AppContext.Provider value={{
            currentTheme,
            setCurrentTheme,
            selectedProject,
            setSelectedProject,
            maps,
            setMaps,
            projects,
            setProjects,
            paths,
            setPaths,
            currentPath,
            setCurrentPath,
            ...additionalStates
        }}>
            {children}
        </AppContext.Provider>
    )
};
