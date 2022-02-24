import React from "react";


const ProjectItem = ({ project }) => {
    return (
        <tr class='table-primary'>
            <td class='table-success'>
                {project.title}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.contributors.map((user) => <div>{user.username}</div>)}
            </td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
    return (
        <table class="table table-hover table-dark">
            <thead>
                <th scope="col">
                    <div>Title</div>
                </th>
                <th scope="col">
                    <div>Repository</div>
                </th>
                <th scope="col">
                    <div>Contributors</div>
                </th>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
    )
}

export default ProjectList;
