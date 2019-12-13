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
      className="navBar"
    >
      <Navbar.Brand className="brand">
        <Link
          className="text-white"

          to="/"
        >
          GL
          <img className="globalImg" src="global.gif" />
          Chat
        </Link>
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav className="align-items-center menuRight">
          {props.user ? (
            <>
            <div className="loginDiv">
              <img
                src={props.user.profilePic}
                className="imgProfile"
              />
              <p>
                Hello {props.user.username}
              </p>
              </div>
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
                Sign up with Google
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
              <NavLink
                className="text-white ml-3"
                style={{ textDecoration: "none", fontSize: "20px" }}
                to="/About"
              >
                About
              </NavLink>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
