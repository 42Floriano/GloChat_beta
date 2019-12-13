import React, { Component } from "react";

class Rooms extends Component {
  state = {
    selected: null
  };
  getCountyFlag = countryCode =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  userIsOnline = room => {
    const online = this.props.onlineUsers
      .map(x => {
        return x && x._id;
      })
      .includes(room.users[1]._id);
    return online;
  };

  selectRoom = id => {
    this.setState({
      selected: id
    });
  };

  render() {
    const props = this.props;
    return props.rooms.map(room => {
      return (
        <a
          onClick={() => {
            props.joinRoom(room);
            this.selectRoom(room._id);
          }}
        >
          <div
            key={room._id}
            className={`room ${
              this.state.selected === room._id ? "selected" : ""
            }`}
          >
            <img
              className="profile-pic"
              src={
                props.user._id === room.users[0]._id
                  ? room.users[1].profilePic
                  : room.users[0].profilePic
              }
              alt="user"
            />

            <h5>
              {props.user._id === room.users[0]._id
                ? room.users[1].username
                : room.users[0].username}
            </h5>

            <img
              className="dot"
              src={this.userIsOnline(room) ? "green-dot.png" : "red-dot.png"}
              alt="dot"
            />
          </div>
        </a>
      );
    });
  }
}

export default Rooms;
