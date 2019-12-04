import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";

const Navbar = props => {
  return (
    <Nav className="nav justify-content-end" bg="primary">
      <React.Fragment>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </React.Fragment>
      )}
    </Nav>
  );
};

export default Navbar;
