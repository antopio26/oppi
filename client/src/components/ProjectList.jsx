import {NewProjectButton} from "./NewProjectButton";
import ProjectCard from "./ProjectCard";
import React, {memo} from "react";

const ProjectList = memo(function({projects}) {

    return (
        <div className="projects-list">
            <div className="projects-list-top">
                <h1>Projects</h1>
                <NewProjectButton/>
            </div>
            {projects.sort((a, b) => new Date(b.lastOpenAt) - new Date(a.lastOpenAt))
                .map((project, i) => (
                    <ProjectCard key={project._id} project={project}/>
                ))
            }
        </div>
    );
});


export default ProjectList;