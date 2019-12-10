import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import axios from "axios";
import Room from "./Room";

class ChatTest extends Component {
  state = {
    message: "",
    profilePic: "",
    user: this.props.user,
    rooms: [],
    messages: [],
    socketId: ""
  };

  componentDidMount = () => {
    axios
      .get("/getRooms")
      .then(res => {
        this.setState({
          rooms: res.data
        });
      })
      .catch(err => console.log(err));
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
    console.log("hello", this.state.profilePic);
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
      </div>
    );
  }
}

export default ChatTest;
