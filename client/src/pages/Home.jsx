import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

import "../style/css/Home.css";
import { Divider } from "primereact/divider";

export default function Home() {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    return (
        <main>
            <section className={"wrapper"}>
                <div className="welcome">
                    { isAuthenticated ? <>
                            <p>Welcome back, {user.name}</p>
                            <Button icon="pi pi-user" rounded iconOnly className={"button lighter-secondary"}/>
                        </>
                        : <>
                            <p>Welcome in this beautiful place</p>
                            <LoginButton rounded icon text/>
                        </>
                    }
                </div>
                <div className="intro">
                    <div className={"title"}><span>OctoMap</span> <span>Path</span> <span>Planning</span><br/><span>Interface</span></div>
                    <p>
                        Un'interfaccia grafica per il path planning 3D su OctoMap.
                        Carica la tua OctoMap, definisci il punto di partenza e quello di arrivo, e OppI si occuperà del resto.
                    </p>

                    <Button label="Get Started" icon="pi pi-arrow-right" iconPos="right" rounded onClick={() => {
                        if (isAuthenticated) {
                            navigate("/dashboard")
                        } else {
                            loginWithRedirect({appState: {returnTo: "/dashboard"}});
                        }
                    }}/>
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
                        <div className="icon">
                            <i className="pi pi-compass" style={{fontSize: '2.5rem'}}></i>
                        </div>
                        <div className="title">Naviga</div>
                        <div className="text">
                            Stabilisci un punto di partenza e uno di arrivo. OppI cercherà più velocemente possibile il
                            percorso migliore.
                        </div>
                    </div>
                    <div className="content-item">
                        <div className="icon">
                            <i className="pi pi-database" style={{fontSize: '2.5rem'}}></i>
                        </div>
                        <div className="title">Analizza</div>
                        <div className="text">
                            Confronta i percorsi generati nel tempo.
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}