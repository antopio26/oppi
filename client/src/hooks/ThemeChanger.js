import {useEffect, useState} from "react";

export default function useThemeChanger() {
    const themes = ["lemon","orange", "lime"];
    const colors = ["#fece2e", "#ff8000", "#95FF00"]
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || themes[0]);

    function isValid(theme) {
        return themes.includes(theme);
    }

    // Hex by Theme
    const hexTheme = {
        orange: "#ff8000",
        lime: "#95FF00",
        lemon: "#fece2e"
    }[currentTheme];

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme && isValid(storedTheme)) {
            setCurrentTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", currentTheme);
        document.body.setAttribute("theme", currentTheme);
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        setTimeout(() => metaThemeColor.setAttribute("content", hexTheme), 250);
    }, [currentTheme]);

    const changeTheme = (newTheme = undefined) => {
        if (!newTheme) {
            newTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
        } else if (!isValid(newTheme)) {
            return;
        }
        setCurrentTheme(newTheme);
    }

    const getColors = () => {
        return colors;
        };

    const getThemes = () => {
        return themes;
    }

    return {currentTheme, hexTheme, changeTheme, getColors, getThemes};
}