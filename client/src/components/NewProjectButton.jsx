import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import MapDropdown from "./MapDropdown";

export function NewProjectButton() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button label="New Project" rounded icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="New Project" visible={visible} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}>
            <div className="input-container">
                <label htmlFor="ProjectName">Project Name</label>
                <InputText id="name"/>
            </div>
            <div className="input-container">
                <label htmlFor="Map">Map</label>
                <MapDropdown/>
            </div>

            </Dialog>
        </>
    )
}