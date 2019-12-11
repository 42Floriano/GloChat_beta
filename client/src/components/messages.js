import React, { Component } from "react";
import Message from "./Message";

class Messages extends Component {

state ={
  message: ""
  listeLanguages: {},

}

sendMessage = event => {
  event.preventDefault();
  socket.emit("message", {
    message: this.state.message,
    userId: this.state.user._id,
    username: this.state.user.username,
    socketId: this.state.socketId,
    roomId: this.state.roomId,
    defaultLanguage: this.state.user.defaultLanguage
  });
  this.setState({
    message: ""
  });
};

handleChange = event => {
  this.setState(
    {
      [event.target.name]: event.target.value
    },
    () => console.log(this.state.defaultLanguage)
  );
};

handleSubmit = event => {
  event.preventDefault();
  // console.log(this.state.defaultLanguage);
  // console.log(this.state.user._id);
  // console.log(this.state.user.);
  axios
    .post("/auth/updateLang", {
      id: this.state.user._id,
      defaultLanguage: this.state.defaultLanguage
    })
    .then(response => {
      console.log("LOOOOOOOOOOOOOOOOK", this.state.defaultLanguage);
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
    return (
      <Col xs={6} id="chat" className="bg-primary">
        <ScrollToBottom className="messages">
          {this.props.messages.map(msg => {
            return <Message user={this.props.user} msg={msg} key={msg._id} />;
          })}
        </ScrollToBottom>

        <form onSubmit={this.sendMessage}>
          <input
            type="text"
            name="message"
            id="message"
            value={this.state.message}
            onChange={this.handleChange}
          />

          <button className="btn btn-light ml-4" type="submit">
            Send
          </button>
        </form>

        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label style={{ fontWeight: "500" }}>
              Select your language
            </Form.Label>

            <Form.Control
              as="select"
              value={this.state.defaultLanguage}
              onChange={this.handleChange}
              name="defaultLanguage"
            >
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

          <button className="btn btn-light ml-4" type="submit">
            Change language
          </button>
        </form>
      </Col>
    );
  }
}

export default Messages;
