import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './UserEdit.css'; // Make sure to import the CSS file

function UserEdit() {
  const { id } = useParams(); // Get the user ID from URL params
  const [name, setName] = useState(""); // State for user name
  const [email, setEmail] = useState(""); // State for user email
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [error, setError] = useState(""); // Error state for handling errors
  const navigate = useNavigate(); // To navigate after form submission

  // Fetch user data when component mounts or when `id` changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
        setLoading(false); // Data has been loaded
      } catch (error) {
        setError("Error fetching user data. Please try again.");
        setLoading(false);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the async function
  }, [id]);

  // Handle form submission to update the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email });
      navigate("/"); // Redirect after updating
    } catch (error) {
      setError("Error updating user. Please try again.");
      console.error("Error updating user:", error);
    }
  };

  // Render loading state, error messages, or form
  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <form onSubmit={handleSubmit} className="user-edit-form">
      <h1 className="form-title">Edit User</h1>
      {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
      <div className="form-field">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            className="input-field"
            required
          />
        </label>
      </div>
      <div className="form-field">
        <label className="form-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            className="input-field"
            required
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
}

export default UserEdit;
