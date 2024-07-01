import React, {useContext, useEffect, useState} from 'react';
import "../style/css/Paths.css";
import {useAuth0} from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import PathsSidebar from "../components/PathsSidebar";
import {AppContext} from "../providers/AppContext";
import {Button} from "primereact/button";

export default function Paths() {
    const {user, isAuthenticated} = useAuth0();
    const {toastRef} = useContext(AppContext);
    const [selection,setSelection] = useState("history");

    return (
        <>
            <Sidebar info={"Find your favourite and latest paths."}>
                <PathsSidebar selection={selection} setSelection={setSelection}/>
            </Sidebar>
            <main className={"paths-main"}>
                <h1>{selection[0].toUpperCase() + selection.slice(1) + " Paths"}</h1>
                <div className={"paths-container"}>
                    <div className="path-card">
                        <span>Created on: 32/16/2193</span>
                        <span>Nodes: 9</span>
                        <span>Length: 19.3m</span>
                        <div className="actions">
                            <Button icon={"pi pi-bookmark"} className={"save-button"} text rounded/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
