import React from 'react';
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
    return (
        <div>
            <h1>Home Page</h1>
            <LoginButton/>
            <LogoutButton/>
        </div>
    )
}