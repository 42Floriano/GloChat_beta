import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";

const Navbar = props => {
  return (
    <Nav className="nav justify-content-end " bg="primary">
      <React.Fragment>
        <Link className="text-white mr-2" to="/signup">
          Signup
        </Link>
        <Link className="text-white mr-2" to="/login">
          Login
        </Link>
      </React.Fragment>
    </Nav>
  );
};

export default Navbar;
