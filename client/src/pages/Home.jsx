import React, {useRef, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import useTheme from "../hooks/Theme";

import "../style/css/Home.css";
import {Divider} from "primereact/divider";
import {AvatarGroup} from "primereact/avatargroup";
import {Avatar} from "primereact/avatar";
import {Canvas} from "@react-three/fiber";
import MapScene from "../components/MapScene";
import useMockMapData from "../hooks/MockMapData";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
    const {user, isAuthenticated, loginWithRedirect} = useAuth0();
    const navigate = useNavigate();
    const {changeTheme} = useTheme();
    const compass = useRef(null);
    const [rotation, setRotation] = useState(0);

    const {voxels, rrtPaths, optPaths, smoothPath, readyState, waypoints, waypointsColor} = useMockMapData('octomap.bt', 'mockMap.json');

    return (
        <main className={"home-main"}>
            <section className={"wrapper"}>
                <div className="welcome">
                    {isAuthenticated ? <>
                            <p>Welcome back, {user.name}</p>
                            <LogoutButton rounded iconOnly text/>
                        </>
                        : <>
                            <p>Welcome in this beautiful place</p>
                            <LoginButton rounded icon text redirectTo={"/dashboard"}/>
                        </>
                    }
                </div>
                <div className="creators">
                    <p className={"label"}>Developed by</p>
                    <div className={"info"}>Antonio Pio Maggio and Ivan Cisternino
                        <AvatarGroup>
                            <Avatar image="https://avatars.githubusercontent.com/u/15969380?v=4" shape="circle"
                                    className={"p-avatar-md"}/>
                            <Avatar image="https://avatars.githubusercontent.com/u/48787465?v=4" shape="circle"
                                    className={"p-avatar-md"}/>
                        </AvatarGroup>
                    </div>
                </div>
                <div className="intro">
                    <div className={"title"}>OctoMap Path Planning Interface</div>
                    <p>
                        A graphical interface for 3D path planning on OctoMap.
                        Load your OctoMap, define the starting and ending points, and OPPI will take care of the rest.
                    </p>

                    <div className="buttons">
                        <Button label="GitHub" icon="pi pi-github" iconPos="right" rounded onClick={() => {
                            window.open("https://github.com/antopio26/oppi", "_blank")
                        }} className={"lighter-secondary-bg"}/>
                        <Button label="Get Started" icon="pi pi-arrow-right" iconPos="right" rounded onClick={() => {
                            if (isAuthenticated) {
                                navigate("/dashboard")
                            } else {
                                loginWithRedirect({appState: {returnTo: "/dashboard"}});
                            }
                        }}/>
                    </div>

                </div>
            </section>
            <aside>
                <Canvas className={"example"}>
                    <MapScene
                        waypoints={waypoints}
                        waypointsColor={waypointsColor}
                        voxels={voxels}
                        rrtPaths={rrtPaths}
                        optPaths={optPaths}
                        smoothPath={smoothPath}
                        readyState={readyState}
                        interactive={false}
                    />
                </Canvas>
            </aside>
            <footer>
                <div className="title-container">
                    <Divider/>
                    <div className="title">How does it work?</div>
                    <Divider/>
                </div>
                <div className="content">
                    <div className="content-item">
                        <div ref={compass} className="icon" style={{"cursor": "pointer"}} onClick={() => {
                            changeTheme();
                            compass.current.style.rotate = (rotation + 60) + "deg";
                            setRotation(rotation + 60);
                        }}>
                            <i className="pi pi-compass" style={{fontSize: '2.5rem'}}></i>
                        </div>
                        <div className="title">Navigate</div>
                        <div className="text">
                            Set a starting point and an ending point.
                            OPPI will try to find the best path in the shortest time possible.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="icon">
                            <i className="pi pi-database" style={{fontSize: '2.5rem'}}></i>
                        </div>
                        <div className="title">Inspect</div>
                        <div className="text">
                            Compare the paths generated over time.
                            Study the parameters and understand how they influence the path.
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}