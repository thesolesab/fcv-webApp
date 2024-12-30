import React from 'react'

const UserCard = ({ user }) => {

    return (
        <div className="userSection">
            <ul>
                <li>Name: <input type="text" value={user.first_name} /></li>
                <li></li>
            </ul>
        </div>
    )
}

export default UserCard