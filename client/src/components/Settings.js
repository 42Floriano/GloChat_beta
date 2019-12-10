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
    profilePic: "",
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
    console.log("hello");
    axios.get("/api/test").then(user => {
      console.log(user.data);
      this.setState(
        {
          profilePic: user.data.profilePic
        },
        () => console.log(this.state.profilePic)
      );
    });
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
              pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}"
            />
            <b
              style={{
                color: "#1D2951",
                textAlign: "center",
                fontSize: "0.5em "
              }}
            >
              Your password should contain at least one uppercase letter, one
              downcase letter, one number and be at least 8 to 15 characters
              long and special characters.
            </b>
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
          <Form.Group>
            <Form.Label htmlFor="text" style={{ fontWeight: "500" }}>
              Upload an Image:{" "}
            </Form.Label>
            <Form.Control
              id="image"
              type="file"
              name="imagePath"
              placeholder="User image"
              onChange={this.imageUpload}
            />
          </Form.Group>
          {this.state.upload && (
            <div>
              Please wait for a second while we make your image look amazing
            </div>
          )}
          <img
            src={this.state.profilePic}
            style={{
              border: "2px solid black",
              margin: "30px  20px",
              display: "flex",
              float: "right",
              width: "10%",
              position: "fixed",
              bottom: "65%",
              left: "85%"
            }}
            alt="profile"
          />
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
