import {Button} from "primereact/button";

export default function ProjectCard({project}) {
    const handleSelection = (e) => {
        document.querySelectorAll(".project-card img.selected").forEach((card) => {
            card.classList.remove("selected");
        });
        e.target.classList.add("selected");
        // TODO: set selectedProject to project
    }
    return (
        <div className={"project-card"}>
            <div className="preview">
                <img tabIndex={0} src="https://i.ytimg.com/vi/GaX4vOM16EE/maxresdefault.jpg" alt="Project Preview" onClick={handleSelection}/>
            </div>
            <div className="project-info">
                <div className="project-info-top">
                <h3>Project {project}</h3>
                    <div className="actions">
                        <Button className={"duplicate-button"} label={"Duplicate"} icon="pi pi-copy" text rounded/>
                        <Button className={"delete-button"} icon="pi pi-trash" severity={"danger"} text rounded/>
                    </div>
                </div>
                        <ul>
                            <li>
                                <p className={"label"}>Paths</p>
                                <p className={"value"}>21</p>
                            </li>
                            <li>
                                <p className={"label"}>Nodes</p>
                                <p className={"value"}>76</p>
                            </li>
                            <li>
                                <p className={"label"}>Total length</p>
                                <p className={"value"} data-unit={"m"}>550</p>
                            </li>
                            <li>
                                <p className={"label"}>Time to generate</p>
                                <p className={"value"} data-unit={"s"}>7</p>
                            </li>
                        </ul>
                <div className="project-footer">
                <span className={"opened"}>
                    <span>Last opened:</span>
                    <span>Today</span>
                </span>
                    <span className={"created"}>
                    <span>Created on: </span>
                    <span>2021-01-01</span>
                </span>
                </div>
            </div>
        </div>
    )
}