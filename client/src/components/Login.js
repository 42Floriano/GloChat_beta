import React, { Component } from "react";
import { Alert, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.props.setUser(response.data);
        this.props.history.push("/");
        console.log(response.data);
      })
      .catch(err => {
        if (err.response.data.message) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  render() {
    console.log(this.props);
    return (
      <div className="container border border-secondary p-4 mt-4 mr-auto ml-auto col-md-3 loginDivPage">
        <h2 className="text-center" style={{ marginTop: "20px", marginBot: "20px", fontWeight: "bold" }}>
          Login
        </h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username" style={{ fontWeight: "500" }}>
              Username:{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password" style={{ fontWeight: "500" }}>
              Password:{" "}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.error && (
            <Alert variant="danger">{this.state.error}</Alert>
          )}
          <Button className="btn btn-primary btn-lg"
            style={{
              // backgroundColor: "crimson",
              color: "white",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%"
            }}
            type="submit"
          >
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
