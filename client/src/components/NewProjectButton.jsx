import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import React, {useEffect, useRef, useState} from "react";
import MapDropdown from "./MapDropdown";

export function NewProjectButton() {
    const [visible, setVisible] = useState(false);
    const newProjRef = useRef(null);

    return (
        <>
            <Button label="New Project" rounded icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog ref={newProjRef} header="New Project" dismissableMask visible={visible} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }} onShow={(e)=>{
                newProjRef.current.getElement().querySelector('input').focus();
            }}>
            <div className="input-container">
                <label htmlFor="ProjectName">Name</label>
                <InputText name="name" />
            </div>
            <div className="input-container">
                <label htmlFor="Map">Map</label>
                <MapDropdown/>
            </div>
            </Dialog>
        </>
    )
}