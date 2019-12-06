import React, { Component } from "react";
import { Link } from "react-router-dom";
import Room from "./Room";
import axios from "axios";

class ChatTest extends Component {
  state = {
    message: "",
    user: this.props.user,
    rooms: [],
    messages: [],
    socketId: ""
  };

  handleRoomSubit(event) {
    event.preventDefault();
    axios
      .post("/room", { room: "ROOM" })
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
          <div className="col-sm-3 bg-primary">
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
          <Room user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default ChatTest;
