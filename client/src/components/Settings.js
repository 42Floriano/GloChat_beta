import React, { Component } from "react";
import {
  Alert,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";

import axios from "axios";

class Settings extends Component {
  state = {
    password: "",
    confirmPassword: "",
    error: "",
    bio: "",
    completed: false
  };

  validateForm() {
    return (
      this.state.password.length > 8 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChangeClick = async event => {
    event.preventDefault();
    console.log(this.validateForm());
    if (this.validateForm() === true) {
      axios
        .post("/auth/changeDetails", {
          password: this.state.password,
          bio: this.state.bio
        })
        .then(response => {
          console.log(response.data);
          this.setState({
            completed: true,
            error: ""
          });

          setTimeout(() => {
            this.props.history.push("/");
          }, 1000);
          // this.props.history.push("/");
        })
        .catch(err => {
          // if (err.response.data.message) {
          console.log(err);
        });
    } else {
      this.setState({
        error: "Password is too short / did not match"
      });
    }
  };

  render() {
    return (
      <div className="container border border-secondary p-4 mt-4 mr-auto ml-auto col-md-3 ">
        <h2 style={{ color: "black", textAlign: "center" }}>
          Edit your Details!
        </h2>
        <form onSubmit={this.handleChangeClick}>
          <FormGroup bsSize="large" controlId="password">
            <FormLabel>New Password</FormLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large" controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
          </FormGroup>
          <Form.Group>
            <Form.Label htmlFor="text">Add a Bio: </Form.Label>
            <Form.Control
              type="text"
              name="bio"
              id="bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            type="submit"
            bsSize="large"
            text="Change Password"
            loadingText="Changing…"
            isLoading={this.state.isChanging}
            style={{
              backgroundColor: "crimson",
              color: "white",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%"
            }}
          >
            Submit
          </Button>
        </form>
        {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
        {this.state.completed && (
          <Alert variant="success">Password updaded</Alert>
        )}
      </div>
    );
  }
}
export default Settings;
