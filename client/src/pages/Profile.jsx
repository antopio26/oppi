import React, {useEffect} from 'react';
import "../style/css/Profile.css";
import {useAuth0} from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import axios from "axios";
import {log} from "three/examples/jsm/nodes/math/MathNode";

export default function Profile() {
    const {user, isAuthenticated} = useAuth0();

    useEffect(() => {
        try {
            // Fetch the access token
            axios.get("/api/users")
                .then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                    }
                })
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
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
