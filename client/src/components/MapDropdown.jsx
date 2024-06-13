import React, {useEffect, useState} from "react";
import { Dropdown } from 'primereact/dropdown';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {FileUpload} from 'primereact/fileupload';

export default function MapDropdown() {
    const [selectedMap, setSelectedMap] = useState(null);
    const [visible, setVisible] = useState(false);

    const maps = [
        { name: 'Oplà', guid: 'bw2i3nn3' },
        { name: 'Arena', guid: '2hj3bnfj' },
        { name: 'Torino', guid: '2b098ch' },
        { name: 'Mobirec', guid: 'nj2i90j3' },
    ];

    const selectedMapTemplate = (option, props) => {
        if (option) {
            return (
                <div>{option.name}</div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const mapOptionTemplate = (option) => {
        return (
            <div>{option.name}</div>
        );
    };

    const panelFooterTemplate = () => {
        return (
                <Button onClick={() => setVisible(true)} type="button" label="Upload" icon="pi pi-upload" text />
        );
    };

    return (
        <>
            <Dropdown value={selectedMap} onChange={(e) => setSelectedMap(e.value)} options={maps} optionLabel="name"
                  placeholder="Select a Map" panelFooterTemplate={panelFooterTemplate} appendTo={"self"} />
            <Dialog header="New Project" visible={visible} onHide={() => {
                if (!visible) return;
                setVisible(false);
            }}>
                <div className="input-container">
                    <label htmlFor="MapName">Map Name</label>
                    <InputText id="name"/>
                </div>
                <FileUpload name="map" url={'/api/upload'} accept="" maxFileSize={100000000} emptyTemplate={<p onClick={(e)=>e.target.closest(".p-fileupload").querySelector("input[type=file]").click()}>Drag and drop here to upload.</p>} />
            </Dialog>
        </>
    )
}
        