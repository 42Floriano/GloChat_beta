import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Alert, Form, Button } from "react-bootstrap";
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
      <div className="container border border-primary p-4 mt-4">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
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
          <Button type="submit">Log in</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
