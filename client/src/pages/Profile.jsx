import React from 'react';

import "../style/css/Profile.css";

import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";


export default function Profile() {
    const {user, isAuthenticated} = useAuth0();

    return (
        <>
            <Sidebar info={"Modifica i tuoi dati e le tue preferenze."}>
                <ProfileSidebar />
            </Sidebar>
            <main className={"profile-main"}>
                {isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name}/>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </div>
                )}
            </main>
        </>

    );
}