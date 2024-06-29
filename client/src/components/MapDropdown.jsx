import React, {useContext, useEffect, useRef, useState} from "react";
import {Dropdown} from 'primereact/dropdown';
import {Button} from "primereact/button";
import MapUploadDialog from "./MapUploadDialog";
import {AppContext} from "../providers/AppContext";

export default function MapDropdown({selectedMap, setSelectedMap}) {
    const newProjDropdown = useRef(null);
    const [visible, setVisible] = useState(false);
    const dropdownInputRef = useRef(null);
    const {maps} = useContext(AppContext);

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
            <Dropdown ref={newProjDropdown} value={selectedMap} inputRef={dropdownInputRef} onChange={(e) => setSelectedMap(e.value)} options={maps}
                      optionLabel="name" optionValue={"_id"}
                      placeholder="Select a Map" panelFooterTemplate={panelFooterTemplate} appendTo={"self"}/>
            <MapUploadDialog visible={visible} setVisible={setVisible}/>
        </>
    )
}
        