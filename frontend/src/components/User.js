import React from "react";


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
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
        <table>
            <th>
                Username
            </th>
            <th>
                Email
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList;