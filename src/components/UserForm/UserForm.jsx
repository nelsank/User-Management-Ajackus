import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './UserForm.css';  // Make sure to import the CSS file

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make the POST request using async/await
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", { name, email });
      console.log(response.data)
      // Navigate after successful submission
      navigate("/");
    } catch (error) {
      // Handle errors
      console.error("Error adding user:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h1 className="form-title">Add User</h1>
      <div className="form-field">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </label>
      </div>
      <div className="form-field">
        <label className="form-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>
      </div>
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
  );
}

export default UserForm;
