import "../style/css/PathsSidebar.css";
import {AppContext} from "../providers/AppContext";
import {useContext} from "react";

export default function PathsSidebar({selection,setSelection}) {
    const {selectedProject} = useContext(AppContext);

    return (
        <div className="paths-main">
            <div className="section project-name">
                <div className="section-top">
                    <p className={"label"}>Project</p>
                </div>
                <div className="section-content">
                    {selectedProject?.name}
                </div>
            </div>
            <div className={"section paths-selection"}>
                <div className="section-top">
                    <p className={"label"}>Show</p>
                </div>
                <div className="section-content">
                    <ul>
                        {
                            [{name:"history",icon:"history"},{name:"saved",icon:"bookmark",iconSelected:"bookmark-fill"}].map((filter, i) => (
                                <li key={i}>
                                    <label htmlFor={filter.name}>
                                        <i className={`pi pi-${selection===filter.name && filter.iconSelected?filter.iconSelected:filter.icon}`}></i>
                                        <span>{filter.name.charAt(0).toUpperCase() + filter.name.slice(1)}</span>
                                    </label>
                                    <input type="radio" name={"selection"} value={filter.name} hidden id={filter.name} checked={selection===filter.name}
                                    onChange={(e)=> {
                                        setSelection(e.target.value)
                                    }}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}