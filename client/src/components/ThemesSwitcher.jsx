import useThemeChanger from "../hooks/ThemeChanger";

export default function ThemesSwitcher() {
    const {changeTheme} = useThemeChanger();
    return (
        <div className="theme-switcher">
            <button onClick={() => changeTheme("lemon")} className="lemon">Lemon</button>
            <button onClick={() => changeTheme("orange")} className="orange">Orange</button>
            <button onClick={() => changeTheme("lime")} className="lime">Lime</button>
        </div>
    );
}