import React from "react";


const UserItem = ({ user }) => {
    return (
        <tr className='table-primary'>
            <td className='table-success'>
                {user.username}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table className="table table-hover table-dark">
            <thead>
                <th scope="col">
                    <div>Username</div>
                </th>
                <th scope="col">
                    <div>Email</div>
                </th>
                <th scope="col">
                    <div>First name</div>
                </th>
                <th scope="col">
                    <div>Last name</div>
                </th>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
}

export default UserList;
