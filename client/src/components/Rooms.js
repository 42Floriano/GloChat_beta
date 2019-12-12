import React, { Component } from "react";

const Rooms = props => {
  const getCountyFlag = countryCode =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  const userIsOnline = room => {
    props.onlineUsers
      .map(x => {
        return x && x._id;
      })
      .includes(room.users[1]._id);
  };

  return props.rooms.map(room => {
    console.log(props.onlineUsers);
    console.log(userIsOnline(room));
    return (
      <a onClick={() => props.joinRoom(room)}>
        <div key={room._id} className="room">
          <img
            className="profile-pic"
            src={room.users[1].profilePic}
            alt="user"
          />
          <h5>
            {props.user._id === room.users[0]._id
              ? room.users[1].username
              : room.users[0].username}
          </h5>

          <img
            className="dot"
            src={userIsOnline(room) ? "green-dot.png" : "red-dot.png"}
            alt="dot"
          />
        </div>
      </a>
    );

    // <div
    //   key={room._id}
    //   className="conversation list-group-item list-group-item-action"
    // >
    //   <img src={room.users[1].profilePic} />
    //   <span> {room.users[1].username}</span>
    //   <Button onClick={() => this.props.joinRoom(room)}>
    //     {/* {room.users.map(user => `${user.username} `)} */}
    //   </Button>
    // </div>
  });
};

export default Rooms;
