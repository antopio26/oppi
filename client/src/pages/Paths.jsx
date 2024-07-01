import React, {useContext, useState} from 'react';
import "../style/css/Paths.css";
import {useAuth0} from "@auth0/auth0-react";
import Sidebar from "../components/Sidebar";
import PathsSidebar from "../components/PathsSidebar";
import {AppContext} from "../providers/AppContext";
import PathCard from "../components/PathCard";

export default function Paths() {
    const [selection, setSelection] = useState("history");
    const {paths} = useContext(AppContext);

    return (
        <>
            <Sidebar info={"Find your favourite and latest paths."}>
                <PathsSidebar selection={selection} setSelection={setSelection}/>
            </Sidebar>
            <main className={"paths-main"}>
                <h1>{selection[0].toUpperCase() + selection.slice(1) + " Paths"}</h1>
                <div className={"paths-container"}>{
                    (selection === "saved"?paths.filter((path)=>path.saved):paths).map((path, i) => (
                        <PathCard key={i} path={path} selection={selection}/>
                    ))}
                </div>
            </main>
        </>
    );
}
