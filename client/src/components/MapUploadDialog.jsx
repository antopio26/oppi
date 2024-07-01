import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dialog} from "primereact/dialog";
import React, {useEffect, useRef, useState} from "react";
import useMapManager from "../hooks/MapManager";

export default function MapUploadDialog({visible, setVisible}) {
    const newMapFileUpload = useRef(null);
    const newMapDialog = useRef(null);
    const nameInput = useRef(null);
    const {uploadMap} = useMapManager();

    const [progress, setProgress] = useState(0);

    const uploadHandler = ({files}) => {
        uploadMap(files[0], nameInput.current.value, (prog) => setProgress(prog)).then(() => setVisible(false))
    }

    useEffect(() => {
        if(visible) {
            setProgress(0);
        }
    }, [visible]);

    return (
        <Dialog ref={newMapDialog} header="New Map" dismissableMask visible={visible} draggable={false}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
                onShow={() => {
                    nameInput.current.focus();
                }}
        >
            <div className="input-container">
                <label htmlFor="MapName">Map Name</label>
                <InputText ref={nameInput} id="name" placeholder={" "}/>
            </div>
            <FileUpload ref={newMapFileUpload}
                        name="map"
                        accept=".bt"
                        customUpload
                        uploadHandler={uploadHandler}
                        maxFileSize={100000000}
                        previewWidth={50}
                        removeIcon={"pi pi-trash"}
                        emptyTemplate={
                            <p className={"empty-message"}
                                          onClick={(e) => e.target.closest(".p-fileupload").querySelector("input[type=file]").click()}>
                                Drag and drop here to upload.
                            </p>
                        }
                        progressBarTemplate={<></>}
            />
        </Dialog>
    )
}