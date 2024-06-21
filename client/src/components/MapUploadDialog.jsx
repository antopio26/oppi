import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dialog} from "primereact/dialog";
import React, {useRef, useState} from "react";

export default function MapUploadDialog({visible, setVisible}) {
    const newMapFileUpload = useRef(null);
    const newMapDialog = useRef(null);

    return (
        <Dialog ref={newMapDialog} header="New Map" dismissableMask visible={visible} draggable={false}
                maskStyle={{animation: "none"}} onHide={() => {
            if (!visible) return;
            setVisible(false);
        }} onShow={() => {
            newMapDialog.current.getElement().querySelector('input').focus();
        }}>
            <div className="input-container">
                <label htmlFor="MapName">Map Name</label>
                <InputText id="name"/>
            </div>
            <FileUpload ref={newMapFileUpload} name="map" url={'/api/map'} accept=".bt" maxFileSize={100000000}
                        previewWidth={50} removeIcon={"pi pi-trash"}
                        emptyTemplate={<p className={"empty-message"}
                                          onClick={(e) => e.target.closest(".p-fileupload").querySelector("input[type=file]").click()}>Drag
                            and drop here to upload.</p>}/>
        </Dialog>
    )
}