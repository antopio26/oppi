import {Button} from "primereact/button";
import useProjectManager from "../hooks/ProjectManager";
import {useNavigate} from "react-router-dom";

export default function ProjectCard({project}) {
    const {updateLastOpenAt, deleteProject} = useProjectManager();
    const navigate = useNavigate();

    const timeSince = (date) => {

        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) === 1 ? "year" : " years");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) === 1 ? "month" : " months");
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) === 1 ? " day" : " days");
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) === 1 ? " hour" : " hours");
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + (Math.floor(interval) === 1 ? " minute" : " minutes");
        }
        return Math.floor(seconds) + (Math.floor(seconds) === 1 ? " second" : " seconds");
    }

    const handleSelection = (e) => {
        document.querySelectorAll(".project-card img.selected").forEach((card) => {
            card.classList.remove("selected");
        });
        e.target.classList.add("selected");

        updateLastOpenAt(project._id).then(() => {
            navigate('/map')
        });
    }

    const handleDelete = () => {
        deleteProject(project._id)
    }

    return (
        <div className={"project-card"}>
            <div className="preview">
                {project.thumbnail ?
                    <img tabIndex={0} src={project.thumbnail} alt="Project Preview" onClick={handleSelection}/>
                    :
                    <i className="pi pi-image" onClick={handleSelection}></i>
                }
            </div>
            <div className="project-info">
                <div className="project-info-top">
                <h3 onClick={handleSelection}>{project.name}</h3>
                    <div className="actions">
                        <Button className={"duplicate-button"} label={"Duplicate"} icon="pi pi-copy" text rounded/>
                        <Button className={"delete-button"} icon="pi pi-trash" severity={"danger"} text rounded onClick={handleDelete}/>
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
                    <span>{timeSince(new Date(project.lastOpenAt))} ago</span>
                </span>
                    <span className={"created"}>
                    <span>Created on </span>
                    <span>{new Date(project.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}</span>
                </span>
                </div>
            </div>
        </div>
    )
}