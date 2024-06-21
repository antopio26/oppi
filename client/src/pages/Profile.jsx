import React, {useContext, useEffect} from 'react';
import "../style/css/Profile.css";
import {useAuth0} from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import axios from "axios";
import {log} from "three/examples/jsm/nodes/math/MathNode";
import {AppContext} from "../providers/AppContext";

export default function Profile() {
    const {user, isAuthenticated} = useAuth0();
    const {toastRef} = useContext(AppContext);

    useEffect(() => {
            // Fetch the access token
            axios.get("/api/user")
                .then(response => {
                    if (response.status === 200) {
                        //TODO
                    }
                }).catch(()=>{})
    }, []);

    return (
        <>
            <Sidebar info={"Edit your data and preferences."}>
                <ProfileSidebar/>
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
