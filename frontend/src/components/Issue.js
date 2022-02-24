import React from "react";


const IssueItem = ({ issue }) => {
    return (
        <tr class='table-primary'>
            <td class='table-success'>
                {issue.title}
            </td>
            <td>
                {issue.description}
            </td>
            <td>
                {issue.project.title}
            </td>
            <td>
                {issue.isOpen}
            </td>
            <td>
                {issue.assignees.map((user) => <div>{user.username}</div>)}
            </td>
            <td>
                {issue.labels.map((label) => <div>{label?.title}</div>)}
            </td>
        </tr>
    )
}

const IssueList = ({ issues }) => {
    return (
        <table class="table table-hover table-dark">
            <thead>
                <th scope="col">
                    <div>Title</div>
                </th>
                <th scope="col">
                    <div>Description</div>
                </th>
                <th scope="col">
                    <div>Project</div>
                </th>
                <th scope="col">
                    <div>Is Open</div>
                </th>
                <th scope="col">
                    <div>Assignees</div>
                </th>
                <th scope="col">
                    <div>Labels</div>
                </th>
            </thead>
            <tbody>
                {issues.map((issue) => <IssueItem issue={issue} />)}
            </tbody>
        </table>
    )
}

export default IssueList;