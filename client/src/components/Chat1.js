import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import axios from "axios";
import Users from "./Users";
import Message from "./Message";
import Rooms from "./Rooms";

const endpoint = "http://localhost:5000";

let socket = io(endpoint);

class Chat1 extends Component {
  state = {
    user: this.props.user,
    users: [],
    onlineUsers: [],
    messages: [],
    message: "",
    roomId: "",
    rooms: [],
    search: "",
    socketId: socket.id,
    listeLanguages: {},
    defaultLanguage: this.props.user.defaultLanguage
  };

  componentDidMount = () => {
    axios
      .get(
        "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0"
      )
      .then(listeCountry => {
        this.setState({
          listeLanguages: listeCountry.data.dictionary
        });
        //  console.log(this.state.listeLanguages);

        //   const arr = Object.entries(this.state.listeLanguages);
        //   arr.map(item => {
        //    console.log(item[0]);
        //      console.log(item[1].name);
        //   });
      })
      .catch(err => console.log(err));

    axios
      .get("http://geoplugin.net/json.gp")
      .then(resp => {
        const { geoplugin_countryCode, geoplugin_city } = resp.data;
        this.getRooms();
        socket.emit("new_user", this.state.user);
        socket.on("users", users => {
          this.setState({
            onlineUsers: users,
            user: {
              ...this.props.user,
              isOnline: true,
              connection: {
                countryCode: geoplugin_countryCode,
                city: geoplugin_city
              }
            }
          });
        });

        socket.on("message", message => {
          //this.getMessages(this.state.roomId);
          this.setState({
            messages: [...this.state.messages, message]
          });
        });

        socket.on("welcome", message => {
          console.log(message);
          this.getRooms();
        });
        socket.on("room", room => {
          this.setState(
            {
              roomId: room[0]._id
            },
            () => this.joinRoom(room[0])
          );
          this.getRooms();
        });
      })
      .catch(err => console.log(err));

    socket.emit("disconnect");

    socket.off();
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => console.log(this.state.defaultLanguage)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state.defaultLanguage);
    // console.log(this.state.user._id);
    // console.log(this.state.user.);
    axios
      .post("/auth/updateLang", {
        id: this.state.user._id,
        defaultLanguage: this.state.defaultLanguage
      })
      .then(response => {
        console.log("LOOOOOOOOOOOOOOOOK", this.state.defaultLanguage);
        console.log(response.data);
      })
      .catch(err => {
        if (err.response.data.message) {
          this.setState({
            error: err.response.data.message
          });
        }
      });
  };

  searchUsers = event => {
    event.preventDefault();
    axios
      .get(`/users/${this.state.search}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          users: [...this.state.users, ...res.data],
          search: ""
        });
      })
      .catch(err => console.log(err));
  };

  joinRoom = room => {
    socket.emit("joinRoom", {
      user: this.state.user,
      room: room._id
    });
    this.setState({
      roomId: room._id
    });
    this.getMessages(room);
  };

  joinPrivate = user => {
    socket.emit("joinPrivate", { user1: this.state.user, user2: user });
    this.setState({
      users: []
    });
  };

  sendMessage = event => {
    event.preventDefault();
    socket.emit("message", {
      message: this.state.message,
      userId: this.state.user._id,
      username: this.state.user.username,
      socketId: this.state.socketId,
      roomId: this.state.roomId,
      defaultLanguage: this.state.user.defaultLanguage
    });
    this.setState({
      message: ""
    });
  };

  getMessages = room => {
    axios
      .get(`/messages/${room._id}`)
      .then(res => {
        this.setState({
          messages: res.data
        });
      })
      .catch(err => console.log(err));
  };

  getRooms = () => {
    axios.get("/rooms").then(res => {
      this.setState({
        rooms: res.data
      });
    });
  };

  render() {
    return (
      <div className="chat-container">
        <div className="rooms-container">
          <div className="search-area">
            <input type="text" placeholder="Search fo a user" />
          </div>
          <Rooms
            user={this.state.user}
            rooms={this.state.rooms}
            users={this.state.users}
            onlineUsers={this.state.onlineUsers}
            joinRoom={this.joinRoom}
          />
        </div>
        <div className="messages-container">
          <ScrollToBottom className="messages">
            {this.state.messages.map(msg => {
              return (
                <div>
                  <Message user={this.state.user} msg={msg} key={msg._id} />
                </div>
              );
            })}
          </ScrollToBottom>

          <div>
            <form className="message-area" onSubmit={this.sendMessage}>
              <textarea
                type="text"
                name="message"
                id="message-text"
                value={this.state.message}
                onChange={this.handleChange}
                rows="2"
              />
              <button className="submit-message" type="submit">
                <i className="fa fa-send fa-2x" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat1;

// <div class="container app">
//   <div class="row app-one">
//     <div class="col-sm-4 side">
//       <div class="side-one">
//         <div class="row heading">
//           <div class="col-sm-3 col-xs-3 heading-avatar">
//             <div class="heading-avatar-icon">
//               <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
//             </div>
//           </div>
//           <div class="col-sm-1 col-xs-1  heading-dot  pull-right">
//             <i
//               class="fa fa-ellipsis-v fa-2x  pull-right"
//               aria-hidden="true"
//             ></i>
//           </div>
//           <div class="col-sm-2 col-xs-2 heading-compose  pull-right">
//             <i
//               class="fa fa-comments fa-2x  pull-right"
//               aria-hidden="true"
//             ></i>
//           </div>
//         </div>

//         <div class="row searchBox">
//           <div class="col-sm-12 searchBox-inner">
//             <div class="form-group has-feedback">
//               <input
//                 id="searchText"
//                 type="text"
//                 class="form-control"
//                 name="searchText"
//                 placeholder="Search"
//               />
//               <span class="glyphicon glyphicon-search form-control-feedback"></span>
//             </div>
//           </div>
//         </div>

//         <div class="row sideBar">
//           <div class="row sideBar-body">
//             <div class="col-sm-3 col-xs-3 sideBar-avatar">
//               <div class="avatar-icon">
//                 <img src="https://bootdey.com/img/Content/avatar/avatar1.png" />
//               </div>
//             </div>
//             <div class="col-sm-9 col-xs-9 sideBar-main">
//               <div class="row">
//                 <div class="col-sm-8 col-xs-8 sideBar-name">
//                   <span class="name-meta">John Doe</span>
//                 </div>
//                 <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
//                   <span class="time-meta pull-right">18:18</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="row sideBar-body">
//             <div class="col-sm-3 col-xs-3 sideBar-avatar">
//               <div class="avatar-icon">
//                 <img src="https://bootdey.com/img/Content/avatar/avatar2.png" />
//               </div>
//             </div>
//             <div class="col-sm-9 col-xs-9 sideBar-main">
//               <div class="row">
//                 <div class="col-sm-8 col-xs-8 sideBar-name">
//                   <span class="name-meta">John Doe</span>
//                 </div>
//                 <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
//                   <span class="time-meta pull-right">18:18</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div class="row sideBar-body">
//             <div class="col-sm-3 col-xs-3 sideBar-avatar">
//               <div class="avatar-icon">
//                 <img src="https://bootdey.com/img/Content/avatar/avatar4.png" />
//               </div>
//             </div>
//             <div class="col-sm-9 col-xs-9 sideBar-main">
//               <div class="row">
//                 <div class="col-sm-8 col-xs-8 sideBar-name">
//                   <span class="name-meta">John Doe</span>
//                 </div>
//                 <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
//                   <span class="time-meta pull-right">18:18</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="side-two">
//         <div class="row newMessage-heading">
//           <div class="row newMessage-main">
//             <div class="col-sm-2 col-xs-2 newMessage-back">
//               <i class="fa fa-arrow-left" aria-hidden="true"></i>
//             </div>
//             <div class="col-sm-10 col-xs-10 newMessage-title">
//               New Chat
//             </div>
//           </div>
//         </div>

//         <div class="row composeBox">
//           <div class="col-sm-12 composeBox-inner">
//             <div class="form-group has-feedback">
//               <input
//                 id="composeText"
//                 type="text"
//                 class="form-control"
//                 name="searchText"
//                 placeholder="Search People"
//               />
//               <span class="glyphicon glyphicon-search form-control-feedback"></span>
//             </div>
//           </div>
//         </div>

//         <div class="row sideBar-body">
//           <div class="col-sm-3 col-xs-3 sideBar-avatar">
//             <div class="avatar-icon">
//               <img src="https://bootdey.com/img/Content/avatar/avatar5.png" />
//             </div>
//           </div>
//           <div class="col-sm-9 col-xs-9 sideBar-main">
//             <div class="row">
//               <div class="col-sm-8 col-xs-8 sideBar-name">
//                 <span class="name-meta">John Doe</span>
//               </div>
//               <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
//                 <span class="time-meta pull-right">18:18</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="col-sm-8 conversation">
//     <div class="row heading">
//       <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
//         <div class="heading-avatar-icon">
//           <img src="https://bootdey.com/img/Content/avatar/avatar6.png" />
//         </div>
//       </div>
//       <div class="col-sm-8 col-xs-7 heading-name">
//         <a class="heading-name-meta">John Doe</a>
//         <span class="heading-online">Online</span>
//       </div>
//       <div class="col-sm-1 col-xs-1  heading-dot pull-right">
//         <i
//           class="fa fa-ellipsis-v fa-2x  pull-right"
//           aria-hidden="true"
//         ></i>
//       </div>
//     </div>

//     <div class="row message-body">
//       <div class="col-sm-12 message-main-receiver">
//         <div class="receiver">
//           <div class="message-text">Hi, what are you doing?!</div>
//           <span class="message-time pull-right">Sun</span>
//         </div>
//       </div>
//     </div>

//     <div class="row message-body">
//       <div class="col-sm-12 message-main-sender">
//         <div class="sender">
//           <div class="message-text">I am doing nothing man!</div>
//           <span class="message-time pull-right">Sun</span>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div class="row reply">
//     <div class="col-sm-1 col-xs-1 reply-emojis">
//       <i class="fa fa-smile-o fa-2x"></i>
//     </div>
//     <div class="col-sm-9 col-xs-9 reply-main">
//       <textarea class="form-control" rows="1" id="comment"></textarea>
//     </div>
//     <div class="col-sm-1 col-xs-1 reply-recording">
//       <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
//     </div>
//     <div class="col-sm-1 col-xs-1 reply-send">
//       <i class="fa fa-send fa-2x" aria-hidden="true"></i>
//     </div>
//   </div>
// </div>
