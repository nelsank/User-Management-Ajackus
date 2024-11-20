import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList/UserList";
import UserForm from "./components/UserForm/UserForm";
import UserEdit from "./components/UserEdit/UserEdit";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the UserList page */}
        <Route path="/" element={<UserList />} />
        
        {/* Define the route for adding a new user */}
        <Route path="/add" element={<UserForm />} />
        
        {/* Define the route for editing a user, with :id as a dynamic param */}
        <Route path="/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
