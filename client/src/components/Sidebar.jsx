import "../style/css/Sidebar.css";

import React, {useEffect, useState} from "react";
import {Link, Outlet, Route, Routes, useLocation, useNavigate} from "react-router-dom";

import LogoutButton from "../components/LogoutButton";

import {Button} from "primereact/button";
import ProfileSidebar from "./ProfileSidebar";
import DashboardSidebar from "./DashboardSidebar";
import MapSidebar from "./MapSidebar";
import ThemesSwitcher from "./ThemesSwitcher";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [pathname, setPathname] = useState(location.pathname);

    useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

    return ( pathname !== "/" && pathname!=="/callback" &&
        <aside>
            <div className="top">
                <Link to="/" className={"logo"}>OppI</Link>
            </div>
            <ul>
                <li>
                    <Button tooltip="Profile" tooltipOptions={{position: "bottom"}} icon="pi pi-user"
                            className={pathname !== "/profile" && "p-button-text"} onClick={()=>{
                                navigate("/profile");
                    }}/>
                </li>
                <li>
                    <Button tooltip="Dashboard" tooltipOptions={{position: "bottom"}} icon="pi pi-chart-bar"
                            className={pathname !== "/dashboard" && "p-button-text"} onClick={()=>{
                                navigate("/dashboard");
                    }}/>
                </li>
                <li>
                    <Button tooltip="Map" tooltipOptions={{position: "bottom"}} icon="pi pi-map"
                            className={pathname !== "/map" && "p-button-text"} onClick={()=>{
                                navigate("/map");
                    }}/>
                </li>
            </ul>

            <Routes>
                <Route path="/profile" element={<ProfileSidebar/>}/>
                <Route path="/dashboard" element={<DashboardSidebar/>}/>
                <Route path="/map" element={<MapSidebar/>}/>
                <Route exact path="/" element={<Outlet/>}/>
            </Routes>

            <ThemesSwitcher/>
            <LogoutButton text/>

        </aside>
    );
}