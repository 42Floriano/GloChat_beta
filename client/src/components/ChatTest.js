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

class Chat extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
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
        <div id="search">
          <label for=""><i className="fa fa-search" aria-hidden="true"></i></label>
          <input type="text" placeholder="Search contacts..." />
        </div>

        
        <div id="contacts">
          <ul>
            <li className="contact">
              <div className="wrap">
                <div className="meta">
                  <p className="name">Room 1</p>
                </div>
              </div>
            </li>     
          </ul>
        </div>

        <div id="contacts">
          <ul>
            <li className="contact">
              <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                <div className="meta">
                  <p className="name">Louis Litt</p>
                  <p className="preview">You just got LITT up, Mike.</p>
                </div>
              </div>
            </li>     
          </ul>
        </div>


        <div id="bottom-bar">
          <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
        </div>
      </div>




      <div className="content">
        <div className="contact-profile">
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
          <p>Harvey Specter</p>
          <div className="social-media">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
             <i className="fa fa-instagram" aria-hidden="true"></i>
          </div>
        </div>


        {/* --------- Conversation ----------- */}
        <div className="messages">
          <ul>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>Message 1</p>
            </li>
            <li className="replies">
              <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
              <p>answer 1</p>
            </li>
            <li className="replies">
              <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
              <p>answer 2</p>
            </li>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>Oh yeah, did Michael Jordan tell you th?</p>
            </li>
          </ul>
        </div>

        <div className="message-input">
          <div className="wrap">
          <input type="text" placeholder="Write your message..." />
          <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Send </button>
          <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Select Language </button>
          </div>
        </div>
        </div>
        

        
        </React.Fragment>
    );
  }
}

export default Chat;
