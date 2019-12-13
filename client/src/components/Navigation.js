import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import axios from "axios";

const Navigation = props => {
  const handleLogout = () => {
    axios.delete("/auth/logout");
    props.clearUser(null);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#4056A1" }}
    >
      <Navbar.Brand>
        <Link
          className="text-white"
          style={{ textDecoration: "none", fontSize: "25px" }}
          to="/"
        >
          GL
          <img
            src="global.gif"
            style={{
              width: "20px",
              height: "20px",
              alt: "globe-image",
              color: "white"
            }}
          />
          Chat
        </Link>
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="align-items-center">
          {props.user ? (
            <>
              <img
                src={props.user.profilePic}
                style={{
                  width: "50px",
                  height: "50px",
                  alt: "user-image",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "50%"
                }}
              />
              <h1
                style={{
                  color: "white",
                  fontSize: "20px",
                  display: "flex"
                }}
              >
                Hello {props.user.username}
              </h1>
              <NavLink
                className="text-white nav-link ml-3"
                style={{
                  textDecoration: "none",
                  fontSize: "20px"
                }}
                to="/"
              >
                Chat
              </NavLink>
              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/Settings"
              >
                Settings
              </NavLink>
              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/About"
              >
                About
              </NavLink>
              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <a
                className="text-white "
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  color: "white"
                }}
                href={`${process.env.REACT_APP_SERVER_URL || ""}/auth/google`}
              >
                Sign in with Google
              </a>

              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/login"
              >
                Login
              </NavLink>

              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/signup"
              >
                Signup
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
