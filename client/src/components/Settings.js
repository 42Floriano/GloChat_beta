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
    profilePic: this.props.user,
    bio: "",
    completed: false,
    upload: false
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

  imageUpload = event => {
    console.log("the file to be added is", event.target.files[0]);

    const files = event.target.files[0];
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("profilePic", files);
    this.setState({ upload: true }, () => {
      axios.post("/api/cloudinary", uploadData).then(response => {
        //   const urlPath = response.data.secure_url;
        this.setState({ profilePic: response.data.secure_url }, () => {
          console.log(this.state);
          this.setState({ upload: false });
        });
      });
    });
  };

  handleChangeClick = async event => {
    event.preventDefault();
    console.log(this.validateForm());
    if (this.validateForm() === true) {
      axios
        .post("/auth/changeDetails", {
          password: this.state.password,
          bio: this.state.bio,
          profilePic: this.state.profilePic
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
  componentDidMount = () => {
    console.log(this.props.user.profilePic);
    console.log("hello");
    
      this.setState(
        {
          profilePic: this.props.user.profilePic
        });
    
  };

  render() {
    return (
      <div className="container border border-secondary p-4 mt-4 mr-auto ml-auto col-md-6 loginDivPage">
        {/* <h2 style={{ color: "black", textAlign: "center" }}>
          Edit your Details!
        </h2> */}

        <form onSubmit={this.handleChangeClick}>
          <Form.Label htmlFor="text" style={{ fontWeight: "500" }}>
            Change your Profile Pic:{" "}
          </Form.Label>
          <div className="container  ">
            <Form.Group>
              <img
                src={this.state.profilePic}
                style={{
                  border: "1px solid black",
                  display: "flex",
                  float: "left",
                  width: "20%",
                  margin: "10px 0px 10px",
                }}
                alt="profile"
              />

              <Form.Control
                id="image"
                type="file"
                name="imagePath"
                placeholder="User image"
                onChange={this.imageUpload}
              />
            </Form.Group>
          </div>
          {this.state.upload && (
            <div>
              Please wait for a second while we make your image look amazing
            </div>
          )}

          <FormGroup bsSize="large" controlId="password">
            <FormLabel style={{ fontWeight: "500" }}>Change Password</FormLabel>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large" controlId="confirmPassword">
            <FormLabel style={{ fontWeight: "500" }}>
              Confirm Password
            </FormLabel>
            <FormControl
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}"
            />
            <p
              style={{
                color: "#1D2951",
                textAlign: "center",
                fontSize: "0.9em ",
                textAlign: "left"
              }}
            >
              Your password should contain at least one uppercase letter, one
              downcase letter, one number and be at least 8 to 15 characters
              long and special characters.
            </p>
          </FormGroup>
          <Form.Group>
            <Form.Label htmlFor="text" style={{ fontWeight: "500" }}>
              Add a Bio:{" "}
            </Form.Label>
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
            className="btn btn-primary btn-lg"
            style={{
              // backgroundColor: "crimson",
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
