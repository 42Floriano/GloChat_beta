import React, { Component } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import axios from "axios";

// axios
//   .get
class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    bio: "",
    defaultLanguage: "en - Anglais",
    listeLanguages: {},
    profilePic: "",
    error: "",
    upload: false
  };

  componentDidMount() {
    axios
      .get(
        "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
      )
      .then(listeCountry => {
        this.setState({
          listeLanguages: listeCountry.data.dictionary
        });
        //  console.log(this.state.listeLanguages);

        //   const arr = Object.entries(this.state.listeLanguages);
        //   arr.map(item => {
        //    console.log(item[0]);
        //      console.log(item[1].name);
        //   });
      })
      .catch(err => console.log(err));
  }

  // console.log(getKeyByValue(this.state.listeLanguages,"fr"));

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => console.log(this.state.defaultLanguage)
    );
  };

  // getKeyByValue(object, value) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }

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

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        defaultLanguage: this.state.defaultLanguage,
        profilePic: this.state.profilePic,
        bio: this.state.bio
      })
      .then(response => {
        console.log("LOOOOOOOOOOOOOOOOK", this.state.defaultLanguage);
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
    return (
      <div className="container border border-secondary p-4 mt-4 mr-auto ml-auto col-md-4  ">
        <h2 className="text-center" style={{ fontWeight: "bold" }}>
          SignUp
        </h2>
        <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <Form.Group>
            <Form.Label htmlFor="email" style={{ fontWeight: "500" }}>
              Email id:{" "}
            </Form.Label>
            <Form.Control
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>

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
              required="true"
              // pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}"
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
          </Form.Group>
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
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label style={{ fontWeight: "500" }}>
              Default Language
            </Form.Label>

            <Form.Control
              as="select"
              value={this.state.defaultLanguage}
              onChange={this.handleChange}
              name="defaultLanguage"
            >
              {/* {Object.keys(this.state.listeLanguages).map((country, item) => {
                return <option key={item}> {country} </option>;
              })} */}

              {Object.entries(this.state.listeLanguages).map(country => {
                return (
                  <option key={country[0]}>
                    {" "}
                    {country[0]} - {country[1].name}{" "}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          {this.state.error && (
            <Alert variant="danger">{this.state.error}</Alert>
          )}
          {/* <Form.Group>
            <Form.Label>Default Language</Form.Label>
            <Form.Control as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group> */}
          {!this.state.upload && (
            <Button
              style={{
                backgroundColor: "crimson",
                color: "white",
                margin: "20px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%"
              }}
              type="submit"
            >
              SignUp
            </Button>
          )}
        </Form>
      </div>
    );
  }
}

export default Signup;
