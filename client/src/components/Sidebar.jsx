import "../style/css/Sidebar.css";

import React, {useEffect, useRef, useState} from "react";
import { useLocation, useNavigate} from "react-router-dom";

import LogoutButton from "../components/LogoutButton";

import {Button} from "primereact/button";
import TripleSwitch from "./TripleSwitch";
import useTheme from "../hooks/Theme";
import {useAuth0} from "@auth0/auth0-react";
import {Avatar} from "primereact/avatar";
import {Toast} from "primereact/toast";
import {log} from "three/examples/jsm/nodes/math/MathNode";

export default function Sidebar({info = undefined, children = <></>}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [pathname, setPathname] = useState(location.pathname);
    const {currentTheme, changeTheme, getColors, getThemes} = useTheme();
    const {user} = useAuth0();
    const toastRef = useRef(null);

    useEffect(() => {
        setPathname(location.pathname);
    }, [location.pathname]);

    return (
        <>
            <aside>
                <div className="top">
                    <div className="profile">
                        <Avatar image={user.picture} size="xlarge" shape="circle"/>
                        <div className="info">
                            <span>Ciao</span>
                            <h2>{user.name.substring(0, user.name.indexOf(" ")) || user.name}</h2>
                        </div>
                    </div>
                    <div className="actions" onMouseLeave={info ? ((e) => {
                        e.currentTarget.querySelector(".info-button").classList.remove("open");
                        toastRef.current.clear();
                    }) : (() => undefined)}>
                        <div className="arrow">
                            <i className="pi pi-chevron-left"></i>
                        </div>
                        <LogoutButton text rounded/>
                        <Button icon="pi pi-home" iconPos={"right"} className={"lighter-secondary-bg white-text"} text
                                rounded onClick={() => {
                            navigate("/");
                        }}/>
                        {info &&
                            <Button icon="pi pi-info-circle" iconPos={"right"}
                                    className={"lighter-secondary-bg white-text info-button"}
                                    text rounded onClick={function (e) {
                                if (e.currentTarget.classList.contains("open")) {
                                    toastRef.current.clear()
                                } else {
                                    toastRef.current.show({
                                        severity: "info",
                                        summary: "Info",
                                        detail: info,
                                        sticky: true
                                    });
                                }
                                e.currentTarget.classList.toggle("open");
                            }}/>}
                    </div>
                </div>
                <ul>
                    <li>
                        <Button tooltip="Profile" tooltipOptions={{position: "bottom"}} icon="pi pi-user"
                                className={pathname !== "/profile" && "p-button-text"} onClick={() => {
                            navigate("/profile");
                        }}/>
                    </li>
                    <li>
                        <Button tooltip="Dashboard" tooltipOptions={{position: "bottom"}} icon="pi pi-chart-bar"
                                className={pathname !== "/dashboard" && "p-button-text"} onClick={() => {
                            navigate("/dashboard");
                        }}/>
                    </li>
                    <li>
                        <Button tooltip="Map" tooltipOptions={{position: "bottom"}} icon="pi pi-map"
                                className={pathname !== "/map" && "p-button-text"} onClick={() => {
                            navigate("/map");
                        }}/>
                    </li>
                </ul>

                {children}

                <div className="theme-switch-container">
                    <TripleSwitch className={"hover-text"}
                                  colors={{left: getColors()[0], center: getColors()[1], right: getColors()[2]}}
                                  labels={{
                                      left: {
                                          title: getThemes()[0].charAt(0).toUpperCase() + getThemes()[0].slice(1),
                                          value: getThemes()[0]
                                      },
                                      center: {
                                          title: getThemes()[1].charAt(0).toUpperCase() + getThemes()[1].slice(1),
                                          value: getThemes()[1]
                                      },
                                      right: {
                                          title: getThemes()[2].charAt(0).toUpperCase() + getThemes()[2].slice(1),
                                          value: getThemes()[2]
                                      }
                                  }}
                                  onChange={(theme) => changeTheme(theme)}
                                  selected={currentTheme}
                    />
                </div>
            </aside>
            <Toast ref={toastRef} className={"info-toast"}
                   transitionOptions={
                       {
                           classNames: {
                               enter: "enter",
                               exit: "exit"
                           },
                           timeout: 350,
                       }
                   }
            />
        </>
    );
}