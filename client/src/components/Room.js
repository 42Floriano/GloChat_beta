import React, { Component } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Message from "./Message";
const endpoint = "http://localhost:5000";

let socket;

class Room extends Component {
  state = {
    message: "",
    user: this.props.user,
    rooms: [],
    messages: [],
    socketId: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    socket.emit("message", {
      message: this.state.message,
      userId: this.state.user._id,
      username: this.state.user.username,
      socketId: this.state.socketId
    });
    this.setState({
      message: ""
    });
  };

  componentDidMount() {
    socket = io(endpoint);
    socket.on("connect", () => {
      this.setState({
        socketId: socket.id
      });
    });
    socket.on("message", msg => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });

    axios
      .get("/messages")
      .then(messages => {
        this.setState({
          messages: messages.data
        });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    socket.emit("disconnect");
    socket.off();
  }

  render() {
    return (
      <div className="col-sm-8 bg-secondary">
        {this.state.messages.map(msg => {
          return <Message msg={msg} />;
        })}

        <form id="chatInput" onSubmit={this.handleSubmit}>
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
      </div>
    );
  }
}

export default Room;
