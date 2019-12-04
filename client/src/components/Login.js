import React, { Component } from "react";
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
<<<<<<< HEAD

    login(this.state.username, this.state.password).then(data => {
      axios
        .post("/auth/login", {
          username: this.state.username,
          password: this.state.password
        })
        .then(response => {
          return response.data;
        })
        .catch(err => {
          return err.response.data;
        });
      // if (data.message) {
      //   // handle errors
      //   this.setState({
      //     error: data.message
      //   });
      // } else {
      //   // no error
      //   // lift the data up to the App state
      //   this.props.setUser(data);
      //   // redirect to "/projects"
      //   this.props.history.push("/projects");
      // }
    });
=======
    axios
      .post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);

        return response.data;
      })
      .catch(err => {
        return err.response.data;
      });
>>>>>>> d454e99cac30e6f8fbedee28273bdb4300e416bc
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
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
