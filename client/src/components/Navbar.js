import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";

const NavBar = props => {
  const handleLogout = () => {
    axios.delete("/auth/logout");
    props.clearUser(null);
  };

  return (
    <Navbar className="nav justify-content-end bg-primary d-flex ">
      <Navbar.Brand>
        <Link className="text-white" to="/">
          GloChat
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {props.user ? (
          <React.Fragment>
            <Link className="text-white ml-4" to="/chat">
              Chat
            </Link>
            <Link className="text-white ml-4" to="/" onClick={handleLogout}>
              Logout
            </Link>
            <Link className="text-white ml-4" to="/Settings">
              Settings
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link className="text-white ml-4" to="/signup">
              Signup
            </Link>
            <Link className="text-white ml-4" to="/login">
              Login
            </Link>

            <Link className="text-white ml-4" to="/auth/google">
              Sign in with Google
            </Link>
          </React.Fragment>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
