export default function ProjectCard({project}) {
    return (
        <div className={"project-card"}>
            <img src="" /*alt="Project Preview"*//>
            <div className="project-info">
                <h3>Project {project}</h3>
                <span>
                    <span>Map:</span>
                    <span>map.pcd</span>
                </span>
                <span>
                    <span>Created on: </span>
                    <span>2021-01-01</span>
                </span>
            </div>
            <div className="project-data">
                <span>
                    <span>Last opened:</span>
                    <span>Today</span>
                </span>
                <span>
                    <span>Saved paths: </span>
                    <span>21</span>
                </span>
                <button>Duplicate</button>
                <button>Delete</button>
            </div>

        </div>
    )
}