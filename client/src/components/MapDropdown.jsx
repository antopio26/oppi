
import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import {Button} from "primereact/button";

export default function MapDropdown() {
    const [selectedMap, setSelectedMap] = useState(null);

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
            <div className="py-2 px-3">
                { /* Upload Button */ }
                <Button type="button" label="Upload" icon="pi pi-upload" className="p-button-sm p-button-text p-button-outlined" />
            </div>
        );
    };

    return (
        <Dropdown value={selectedMap} onChange={(e) => setSelectedMap(e.value)} options={maps} optionLabel="name"
                  placeholder="Select a Map" panelFooterTemplate={panelFooterTemplate} />
    )
}
        