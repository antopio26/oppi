import React from 'react';
import "../style/css/Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Profile() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const handleButtonClick = async () => {
        try {
            // Fetch the access token
            const token = await getAccessTokenSilently();

            // Make the authenticated GET request to /api/users
            const response = await fetch('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Parse and log the response
            const data = await response.text();
            console.log(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <>
            <Sidebar info={"Edit your data and preferences."}>
                <ProfileSidebar />
            </Sidebar>
            <main className={"profile-main"}>
                {isAuthenticated && (
                    <div>
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <button onClick={handleButtonClick}>Get User Data</button>
                    </div>
                )}
            </main>
        </>
    );
}
