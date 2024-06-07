import {createContext, useEffect, useState} from "react";
import {themes, isValid} from "../hooks/Theme";

export const ThemeContext = createContext('');

export default function ThemeContextProvider({children}){
    const [currentTheme, setCurrentTheme] = useState(isValid(localStorage.getItem('theme'))? localStorage.getItem("theme"): themes[0]);

    return (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
            {children}
        </ThemeContext.Provider>
    )
} ;
