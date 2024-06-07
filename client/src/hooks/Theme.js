import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../providers/AppContext";
import * as THREE from "three";

export const themes = ["lemon","orange", "lime"];
export const colors = ["#fece2e", "#ff8000", "#95FF00"]
export const isValid = (theme) => themes.includes(theme);

export default function useTheme() {
    const {currentTheme, setCurrentTheme} = useContext(ThemeContext);
    const [primary, setPrimary] = useState('');
    const [background, setBackground] = useState('');
    const [light, setLight] = useState('');

    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme",currentTheme);
    }

    useEffect(() => {
        // Set theme to local storage
        localStorage.setItem("theme", currentTheme);

        // Set theme to document body
        document.body.setAttribute("theme", currentTheme);
        const metaThemeColor = document.querySelector("meta[name=theme-color]");

        setTimeout(() => {
            // get var from css
            const backgroundColor = getComputedStyle(document.body).getPropertyValue('--background');
            const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary');

            // compute mix between background and primary color (without THREE)
            const primaryLightColor = '#' + (new THREE.Color(primaryColor).lerp(new THREE.Color(backgroundColor), 0.9)).getHexString();

            // set state
            setPrimary(primaryColor);
            setBackground(backgroundColor);
            setLight(primaryLightColor);

            metaThemeColor.setAttribute("content", primaryColor);

        }, 250);
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

    return {currentTheme, primary, background, light, changeTheme, getColors, getThemes};
}