import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton';
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

export default function Home() {
    const { user, isAuthenticated } = useAuth0();

    return (
        <main>
            <h1>Home Page</h1>
            {isAuthenticated ?<section>
                <h3>Welcome, {user.name}</h3>
                    <Link to="/dashboard"><Button label="Dashboard" icon="pi pi-chart-bar"/></Link>
                </section>
                : <LoginButton/>}
        </main>
    )
}