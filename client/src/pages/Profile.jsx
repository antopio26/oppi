import React from 'react';

import {useAuth0} from "@auth0/auth0-react";

import Sidebar from "../components/Sidebar";

export default function Profile() {
    const {user, isAuthenticated} = useAuth0();

    return (
        <>
            <main>
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