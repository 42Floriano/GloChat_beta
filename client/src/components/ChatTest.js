import React, { Component } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Message from "./Message";
const endpoint = "http://localhost:5000";
let socket;

class ChatTest extends Component {
  state = {
    message: "",
    user: this.props.user,
    rooms: [],
    messages: []
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
      username: this.state.user.username
    });
    this.setState({
      message: ""
    });
  };

  handleRoomSubit = event => {
    event.preventDefault();
    socket.on("room", room => {
      this.setState(
        {
          rooms: [...this.state.rooms, room]
        },
        () => {
          console.log(this.state.rooms);
        }
      );
    });

    socket.emit("room", {
      userId: this.state.user._id
    });
  };

  componentDidMount() {
    socket = io(endpoint);

    axios
      .get("/messages")
      .then(messages => {
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
        <div
          className="row mt-4"
          style={{
            height: "550px"
          }}
        >
          <div className="col-md-3 bg-primary">
            <h2>Rooms</h2>
            <form onSubmit={this.handleRoomSubit}>
              <button className="btn btn-light" type="submit">
                Generate a room
              </button>
            </form>
            <div>
              {this.state.rooms.map(room => {
                return (
                  <p>
                    <Link className="text-white" to={`/room/${room._id}`}>
                      {room._id}
                    </Link>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="col-md-8 bg-secondary">
            <Message messages={this.state.messages} />

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
        </div>
      </div>
    );
  }
}

export default ChatTest;
