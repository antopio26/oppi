import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import React, {useEffect, useRef, useState} from "react";
import MapDropdown from "./MapDropdown";
import useProjectManager from "../hooks/ProjectManager";

export function NewProjectButton() {
    const newProjRef = useRef(null);
    const nameInput = useRef(null);

    const [visible, setVisible] = useState(false);
    const [selectedMap, setSelectedMap] = useState(null);

    const {createProject} = useProjectManager();

    const handleCreateProject = (e) => {
        const project = {
            name: nameInput.current.value,
            map: selectedMap
        }

        createProject(project).then(() => setVisible(false));
    }

    return (
        <>
            <Button rounded iconPos={"right"} icon="pi pi-plus" onClick={() => setVisible(true)}/>
            <Dialog ref={newProjRef} header="New Project" draggable={false} dismissableMask visible={visible}
                    onHide={() => {
                        if (!visible) return;
                        setVisible(false);
                    }} onShow={(e) => {
                newProjRef.current.getElement().querySelector('input').focus();
            }}>
                <div className="input-container">
                    <label htmlFor="ProjectName">Name</label>
                    <InputText ref={nameInput} name="name" placeholder={" "}/>
                </div>
                <div className="input-container">
                    <label htmlFor="Map">Map</label>
                    <MapDropdown selectedMap={selectedMap} setSelectedMap={setSelectedMap}/>
                </div>
                <div className="buttonbar">
                    <Button label="Create" className={"create-button"} rounded onClick={handleCreateProject} />
                </div>
            </Dialog>
        </>
    )
}