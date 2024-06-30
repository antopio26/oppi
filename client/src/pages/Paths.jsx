import React, {useContext, useEffect} from 'react';
import "../style/css/Paths.css";
import {useAuth0} from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import PathsSidebar from "../components/PathsSidebar";
import {AppContext} from "../providers/AppContext";

export default function Paths() {
    const {user, isAuthenticated} = useAuth0();
    const {toastRef} = useContext(AppContext);

    useEffect(() => {

    }, []);

    return (
        <>
            <Sidebar info={"Find your favourite and latest paths."}>
                <PathsSidebar/>
            </Sidebar>
            <main className={"profile-main"}>

            </main>
        </>
    );
}
