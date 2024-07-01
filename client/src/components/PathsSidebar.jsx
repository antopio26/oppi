import "../style/css/PathsSidebar.css";
import {Button} from "primereact/button";

export default function PathsSidebar() {
    return (
        <div className="paths-main">
            <div className={"section paths-selection"}>
                <div className="section-top">
                    <p className={"label"}>Select</p>
                </div>
                <div className="section-content">
                    <Button icon={"pi pi-history"} className={"history-button"} label={"History"} rounded/>
                    <Button icon={"pi pi-bookmark"} className={"add-button"} label={"Saved"} rounded/>
                </div>
            </div>

        </div>
    )
}