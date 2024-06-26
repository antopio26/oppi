import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dialog} from "primereact/dialog";
import React, {useRef} from "react";
import axios from "axios";

export default function MapUploadDialog({visible, setVisible}) {
    const newMapFileUpload = useRef(null);
    const newMapDialog = useRef(null);

    const uploadHandler = ({files, options}) => {
        let formData = new FormData();
        formData.append('file', files[0]);
        formData.append('name', newMapDialog.current.getElement().querySelector('input').value);

        console.log(files);
        console.log(options);

        axios.post(options.props.url, formData)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    return (
        <Dialog ref={newMapDialog} header="New Map" dismissableMask visible={visible} draggable={false}
                onHide={() => {
            if (!visible) return;
            setVisible(false);
        }} onShow={() => {
            newMapDialog.current.getElement().querySelector('input').focus();
        }}>
            <div className="input-container">
                <label htmlFor="MapName">Map Name</label>
                <InputText id="name" placeholder={" "}/>
            </div>
            <FileUpload ref={newMapFileUpload}
                        name="map"
                        url={'/api/maps'}
                        accept=".bt"
                        customUpload
                        uploadHandler={uploadHandler}
                        maxFileSize={100000000}
                        previewWidth={50}
                        removeIcon={"pi pi-trash"}
                        emptyTemplate={<p className={"empty-message"}
                                          onClick={(e) => e.target.closest(".p-fileupload").querySelector("input[type=file]").click()}>Drag
                            and drop here to upload.</p>}/>
        </Dialog>
    )
}