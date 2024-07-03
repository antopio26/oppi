import {Button} from "primereact/button";
import useProjectManager from "../hooks/ProjectManager";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../providers/AppContext";
import useRemotePlanner from "../hooks/RemotePlanner";

export default function ProjectCard({project}) {
    const {updateLastOpenAt, deleteProject} = useProjectManager();
    const navigate = useNavigate();
    const {setWaypoints} = useRemotePlanner();

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
            setWaypoints([{id: 0, coords: {x: 1, y: 0, z: 1}}]);
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
                        <Button className={"delete-button"} icon="pi pi-trash" severity={"danger"} text rounded onClick={handleDelete}/>
                    </div>
                </div>
                        <ul>
                            <li>
                                <p className={"label"}>Paths</p>
                                <p className={"value"}>{project.nPaths}</p>
                            </li>
                            <li>
                                <p className={"label"}>Nodes</p>
                                <p className={"value"}>{project.nNodes}</p>
                            </li>
                            <li>
                                <p className={"label"}>Total length</p>
                                <p className={"value"} data-unit={"m"}>{project.totalLength}</p>
                            </li>
                            <li>
                                <p className={"label"}>Saved Paths</p>
                                <p className={"value"}>{project.nSavedPaths}</p>
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