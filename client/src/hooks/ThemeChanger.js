import {useEffect, useState} from "react";

export default function useThemeChanger() {
    const themes = ["lemon","orange", "lime"];
    const [theme, setTheme] = useState(localStorage.getItem("theme") || themes[0]);

    function isValid(theme) {
        return themes.includes(theme);
    }

    // Hex by Theme
    const hexTheme = {
        orange: "#ff8000",
        lime: "#95FF00",
        lemon: "#fece2e"
    }[theme];

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme && isValid(storedTheme)) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.body.setAttribute("theme", theme);
        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        setTimeout(() => metaThemeColor.setAttribute("content", hexTheme), 250);
    }, [theme]);

    const changeTheme = (newTheme = undefined) => {
        if (!newTheme) {
            newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        } else if (!isValid(theme)) {
            return;
        }
        setTheme(newTheme);
    }

    return {theme, hexTheme, changeTheme};
}