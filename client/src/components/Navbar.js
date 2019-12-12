import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import axios from "axios";

const NavBar = props => {
  const handleLogout = () => {
    axios.delete("/auth/logout");
    props.clearUser(null);
  };

  return (
    <Navbar
      className="nav justify-content-end d-flex "
      style={{
        backgroundColor: "#4056a1"
      }}
    >
      <Navbar.Brand>
        <Link
          className="text-white"
          style={{ textDecoration: "none", fontSize: "25px" }}
          to="/"
        >
          GloChat
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        {props.user ? (
          <React.Fragment>
            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/"
            >
              Chat
            </Link>
            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/"
              onClick={handleLogout}
            >
              Logout
            </Link>
            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/Settings"
            >
              Settings
            </Link>
            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/About"
            >
              About
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <a
              className="text-white"
              style={{
                textDecoration: "none",
                fontSize: "20px",
                color: "white"
              }}
              href={`${process.env.REACT_APP_SERVER_URL || ""}/auth/google`}
            >
              Sign in with Google
            </a>

            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/signup"
            >
              Signup
            </Link>
            <Link
              className="text-white ml-4"
              style={{ textDecoration: "none", fontSize: "20px" }}
              to="/login"
            >
              Login
            </Link>
          </React.Fragment>
        )}
      </Nav>
    </Navbar>
  );
};

//

export default NavBar;
