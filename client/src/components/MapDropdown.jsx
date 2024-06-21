import React, {useEffect, useRef, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {FileUpload} from 'primereact/fileupload';
import MapUploadDialog from "./MapUploadDialog";

export default function MapDropdown() {
    const [selectedMap, setSelectedMap] = useState(null);
    const newProjDropdown = useRef(null);
    const [visible, setVisible] = useState(false);

    const maps = [
        {name: 'Oplà', guid: 'bw2i3nn3'},
        {name: 'Arena', guid: '2hj3bnfj'},
        {name: 'Torino', guid: '2b098ch'},
        {name: 'Mobirec', guid: 'nj2i90j3'},
    ];

    const panelFooterTemplate = () => {
        return (
            <Button onClick={(e) => {
                setVisible(true);
                newProjDropdown.current.hide()
            }} type="button" label="Upload" icon="pi pi-upload" text/>
        );
    };

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

    return (
        <>
            <Dropdown ref={newProjDropdown} value={selectedMap} onChange={(e) => setSelectedMap(e.value)} options={maps}
                      optionLabel="name"
                      placeholder="Select a Map" panelFooterTemplate={panelFooterTemplate} appendTo={"self"}/>
            <MapUploadDialog visible={visible} setVisible={setVisible}/>
        </>
    )
}
        