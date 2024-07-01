import {useContext, useEffect, useState} from "react";
import {AppContext} from "../providers/AppContext";
import * as THREE from "three";

export const themes = ["lemon","orange", "lime"];
export const colors = ["#fece2e", "#ff8000", "#95FF00"]
export const isValid = (theme) => themes.includes(theme);

export default function useTheme() {
    const {currentTheme, setCurrentTheme} = useContext(AppContext);
    const [primary, setPrimary] = useState('');
    const [background, setBackground] = useState('');
    const [light, setLight] = useState('');

    if(!localStorage.getItem("theme")){
        localStorage.setItem("theme",currentTheme);
    }

    useEffect(() => {
        setColorsAndMeta();
    }, []);

    useEffect(() => {
        // Set theme to local storage
        localStorage.setItem("theme", currentTheme);

        // Set theme to document body
        document.body.setAttribute("theme", currentTheme);
        setTimeout(() => {
            setColorsAndMeta()
        }, 150);
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

    const setColorsAndMeta = () => {
        const backgroundColor = getComputedStyle(document.body).getPropertyValue('--background').toString();
        const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').toString();

        // compute mix between background and primary color (without THREE)
        const primaryLightColor = '#' + (new THREE.Color(primaryColor).lerp(new THREE.Color(backgroundColor), 0.9)).getHexString();

        // set state
        setPrimary(primaryColor);
        setBackground(backgroundColor);
        setLight(primaryLightColor);

        const metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", primaryColor);
    }

    return {currentTheme, primary, background, light, changeTheme, getColors, getThemes};
}