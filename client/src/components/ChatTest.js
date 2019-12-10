import React, { Component } from "react";
import { Link } from "react-router-dom";
import Room from "./Room";
import axios from "axios";

class ChatTest extends Component {
  state = {
    message: "",
    profilePic: "",

    user: this.props.user,
    rooms: [],
    messages: [],
    socketId: ""
  };

  handleRoomSubmit(event) {
    event.preventDefault();
    axios
      .post("/room", { room: "ROOM" })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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
    console.log("hello", this.state.profilePic);
    return (
      <div>
        <div>
          <img
            src={this.state.profilePic}
            style={{
              border: "2px solid black",
              margin: "30px  20px",

              width: "10vw"
            }}
            alt="profile"
          />
        </div>

        <div className="container">
          <div
            className="row mt-4"
            style={{
              height: "550px"
            }}
          >
            <div className="col-sm-3 bg-primary">
              <h2>Rooms</h2>
              <form onSubmit={this.handleRoomSubmit}>
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
      </div>
    );
  }
}

export default ChatTest;
