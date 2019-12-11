import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

class Users extends Component {
  getCountyFlag = countryCode =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  render() {
    return (
      <>
        {this.props.rooms.map(room => {
          if (
            this.props.onlineUsers
              .map(x => {
                return x && x._id;
              })
              .includes(room.users[1]._id)
          ) {
            return (
              <a onClick={() => this.props.joinRoom(room)}>
                <div
                  key={room._id}
                  class="chat_list list-group-item list-group-item-action"
                >
                  <div class="chat_people">
                    <div class="chat_img">
                      <img src={room.users[1].profilePic} alt="user" />
                    </div>
                    <div class="chat_ib">
                      <h5>
                        {this.props.user._id === room.users[0]._id
                          ? room.users[1].username
                          : room.users[0].username}

                        <img className="dot" src="green-dot.png" />

                        <span class="chat_date">Dec 25</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </a>
            );
          } else {
            return (
              <a onClick={() => this.props.joinRoom(room)}>
                <div
                  key={room._id}
                  class="chat_list list-group-item list-group-item-action"
                >
                  <div class="chat_people">
                    <div class="chat_img">
                      <img src={room.users[0].profilePic} alt="user" />
                    </div>
                    <div class="chat_ib">
                      <h5>
                        {this.props.user._id === room.users[0]._id
                          ? room.users[1].username
                          : room.users[0].username}

                        <img className="dot" src="red-dot.png" />

                        <span class="chat_date">Dec 25</span>
                      </h5>
                    </div>
                  </div>
                </div>
              </a>
            );
          }

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
        })}
      </>
    );
  }
}

export default Users;
