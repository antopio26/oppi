import React from 'react';
import {useAuth0} from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

import "../style/css/Home.css";
import {Divider} from "primereact/divider";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
    const {user, isAuthenticated,  loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    return (
        <main>
            <section className={"wrapper"}>
                <div className="welcome">
                    {isAuthenticated ? <>
                            <p>Welcome, {user.name}</p>
                            <LogoutButton rounded iconOnly text/>
                        </>
                        : <>
                            <p>Welcome in this beautiful place</p>
                            <LoginButton rounded icon text/>
                        </>}
                </div>
                <h1>OppI</h1>

                    <Button label="Get Started" icon="pi pi-arrow-right" iconPos="right" rounded onClick={() => {
                        if (isAuthenticated) {
                            navigate("/dashboard")
                        } else {
                            loginWithRedirect({appState: {returnTo: "/dashboard"}});
                        }
                    }}/>
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