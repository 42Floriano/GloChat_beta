import React, { Component } from "react";
import {
  Alert,
  FormGroup,
  FormControl,
  FormLabel,
  Button
} from "react-bootstrap";
// import { Auth } from "aws-amplify";
import axios from "axios";

class Settings extends Component {
  state = {
    password: "",
    confirmPassword: "",
    error: "",
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
          password: this.state.password
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
      <div className="container">
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
          <Button
            block
            type="submit"
            bsSize="large"
            text="Change Password"
            loadingText="Changing…"
            isLoading={this.state.isChanging}
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
