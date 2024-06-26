import {Button} from "primereact/button";
import MapUploadDialog from "./MapUploadDialog";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../providers/AppContext";


export default function MapsList() {
    const [visible, setVisible] = useState(false);
    const {maps, setMaps} = useContext(AppContext);

    const handleResetMapFilter = () => {
        document.querySelectorAll("input[name='map']:checked").forEach((input) => {
            input.checked = false;
        });
    }

    useEffect(() => {
        console.log(maps)
    }, [maps]);

    return (
        <div className={"section"}>
            <div className="section-top">
                <p className={"label"}>Maps</p>
                <Button icon="pi pi-undo" className={"reset-button"} text rounded
                        onClick={handleResetMapFilter}/>
            </div>
            <div className="section-content">
                <ul>
                    {
                        maps.map((map, i) => (
                            <li key={i}>
                                <label htmlFor={map._id}>
                                    {map.name}
                                </label>
                                <input type="checkbox" name={"map"} value={map._id} hidden id={map._id}/>
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
}