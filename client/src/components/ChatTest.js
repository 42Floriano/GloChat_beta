import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
const endpoint = "http://localhost:5000";


let socket;



class ChatTest extends Component {
  state = {
    message: "",
    user: this.props.user,
    room: "1",
    messages: []
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    
    event.preventDefault();
    console.log(this.state);
    socket.emit("message", {
      message: this.state.message,
      userId: this.state.user._id,
      username: this.state.user.username
    });
    this.setState({
      message: ""
    });
  };

  componentDidMount() {
    console.log(this.props);
    socket = io(endpoint);
    axios
      .get("/messages")
      .then(messages => {
        console.log(messages);
        this.setState({
          messages: messages.data
        });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    socket.on("message", messages => {
      this.setState({
        messages: messages
      });
    });
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          {this.state.messages.map(msg => {
            return (
              <div>
                {msg.username} said"{msg.text}"
              </div>
            );
          })}
        </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="message"
            id="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default ChatTest;
