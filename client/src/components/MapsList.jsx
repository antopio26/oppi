import {Button} from "primereact/button";
import MapUploadDialog from "./MapUploadDialog";
import {memo, useState} from "react";
import {retarget} from "three/examples/jsm/utils/SkeletonUtils";


const MapsList = memo(function({maps, onToggle, onReset,onRemove, getMapFilter}) {
    const [visible, setVisible] = useState(false);

    const handleRemoveMap = (e) => {
        e.currentTarget.closest(".maps").classList.toggle("removing")
    }

    return (
        <div className={"section maps"}>
            <div className="section-top">
                <p className={"label"}>Maps</p>

                <Button icon="pi pi-minus" className={"remove-button primary-text"} disabled={maps.length === 0 }
                        text rounded
                        onClick={handleRemoveMap}/>
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
                                onChange={(e)=> {
                                    if (e.target.closest(".section.removing")) {
                                        console.log("removing")
                                        e.preventDefault();
                                        e.target.classList.add("removing")
                                        let target = e.target.closest("li")
                                        setTimeout(() => {
                                            onRemove(map._id)
                                        }, 500)
                                    }else {
                                        onToggle(map._id)
                                    }
                                }}
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