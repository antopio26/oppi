import {Button} from "primereact/button";
import MapUploadDialog from "./MapUploadDialog";
import {memo, useState} from "react";


const MapsList = memo(function({maps, onToggle, onReset, getMapFilter}) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={"section"}>
            <div className="section-top">
                <p className={"label"}>Maps</p>
                <Button icon="pi pi-undo" className={"reset-button"} text rounded disabled={!getMapFilter().length}
                        onClick={onReset}/>
            </div>
            <div className="section-content">
                <ul>
                    {
                        maps.map((map, i) => (
                            <li key={i}>
                                <label htmlFor={map._id}>
                                    {map.name}
                                </label>
                                <input type="checkbox" name={"map"} value={map._id} hidden id={map._id}
                                       checked={getMapFilter().includes(map._id)}
                                onChange={()=> onToggle(map._id)}
                                />
                            </li>
                        ))
                    }
                    <li>
                        <Button label="Upload" icon="pi pi-upload" className={"upload-button"} text rounded onClick={()=>setVisible(true)}/>
                        <MapUploadDialog visible={visible} setVisible={setVisible}/>
                    </li>
                </ul>
            </div>

        </div>
    )
});

export default MapsList;