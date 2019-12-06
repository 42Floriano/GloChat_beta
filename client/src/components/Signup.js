import React, { Component } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import axios from "axios";

// axios
//   .get
class Signup extends Component {
  state = {
    username: "",
    password: "",
    defaultLanguage:"",
    listeLanguages: {},
    error: ""
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
        console.log(Object.keys(this.state.listeLanguages));
      })
      .catch(err => console.log(err));
  }

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state.listeLanguages)
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password,
        listeLanguages: this.state.listeLanguages
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
    return (
      <div className="container border border-primary p-4 mt-4">
        <h2 className="text-center">Signup</h2>
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

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Country List</Form.Label>
            <Form.Control as="select" value={this.state.defaultLanguage} onChange={this.handleChange}>

              {Object.keys(this.state.listeLanguages).map((country, item) => {
                return <option key={item} value={country}> {country} </option>;

              })}

            </Form.Control>
          </Form.Group>



          {this.state.error && (
            <Alert variant="danger">{this.state.error}</Alert>
          )}
          <Button type="submit">Sign up</Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
