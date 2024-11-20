import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './UserList.css';  // Import the CSS file

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users on component mount
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [users]);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-heading">User Management</h1>
      <Link className="link-button" to="/add">Add User</Link>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <span className="user-name">{user.name}</span> - <span className="user-email">{user.email}</span>
            <div className="user-actions">
              <Link className="edit-link" to={`/edit/${user.id}`}>Edit</Link>
              <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
