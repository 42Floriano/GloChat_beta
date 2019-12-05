import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import axios from "axios";

const Navbar = props => {
  const handleLogout = () => {
    logout();

    // props.clearUser(null);
  };
  const logout = () => {
    axios.delete("/auth");
  };
  return (
    <Nav className="nav justify-content-start " bg="info">
      <React.Fragment>
        <Link className="text-white mr-3" to="/signup">
          Signup
        </Link>
        <Link className="text-white mr-3" to="/login">
          Login
        </Link>
        <Link className="text-white mr-3" to="/chat">
          Chat
        </Link>
        <Link className="text-white mr-3" to="/" onClick={handleLogout}>
          Logout
        </Link>
      </React.Fragment>
    </Nav>
  );
};

export default Navbar;
