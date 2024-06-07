import React, {useRef, useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import useThemeChanger from "../hooks/ThemeChanger";

import "../style/css/Home.css";
import {Divider} from "primereact/divider";
import {AvatarGroup} from "primereact/avatargroup";
import {Avatar} from "primereact/avatar";

export default function Home() {
    const {user, isAuthenticated, loginWithRedirect} = useAuth0();
    const navigate = useNavigate();
    const {changeTheme} = useThemeChanger();
    const compass = useRef(null);
    const [rotation, setRotation] = useState(0);

    return (
        <main className={"home-main"}>
            <section className={"wrapper"}>
                <div className="welcome">
                    {isAuthenticated ? <>
                            <p>Welcome back, {user.name}</p>
                            <Button icon="pi pi-user" onClick={() => navigate("/profile")} rounded
                                    className={"button lighter-secondary-bg primary-text"}/>
                        </>
                        : <>
                            <p>Welcome in this beautiful place</p>
                            <LoginButton rounded icon text redirectTo={"/dashboard"}/>
                        </>
                    }
                </div>
                <div className="creators">
                    <p className={"label"}>Realizzato da </p>
                    <div className={"info"}>Antonio Pio Maggio e Ivan Cisternino
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
                        Un'interfaccia grafica per il path planning 3D su OctoMap.
                        Carica la tua OctoMap, definisci il punto di partenza e quello di arrivo, e OPPI si occuperà del
                        resto.
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
                <div className="example"></div>
            </aside>
            <footer>
                <div className="title-container">
                    <Divider/>
                    <div className="title">Come funziona?</div>
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
                        <div className="title">Naviga</div>
                        <div className="text">
                            Stabilisci un punto di partenza e uno di arrivo.
                            OPPI cercherà di trovare, nel minor tempo possibile, il percorso migliore.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="icon">
                            <i className="pi pi-database" style={{fontSize: '2.5rem'}}></i>
                        </div>
                        <div className="title">Analizza</div>
                        <div className="text">
                            Confronta i percorsi generati nel tempo.
                            Studia i parametri e comprendi come questi influenzano il percorso.
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}