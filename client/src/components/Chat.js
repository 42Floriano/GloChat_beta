import React, { Component } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import axios from "axios";
import Message from "./Message";
import Rooms from "./Rooms";
require("dotenv").config();

const endpoint = process.env.CALLBACK_URL;

let socket = io(endpoint);

let geoLoc = process.env.GEO_KEY;

class Chat1 extends Component {
  state = {
    user: this.props.user,
    users: [],
    user2: {},
    onlineUsers: [],
    messages: [],
    message: "",
    roomId: "",
    rooms: [],
    search: "",
    socketId: socket.id,
    listeLanguages: {},
    defaultLanguage: this.props.user.defaultLanguage,
    searchOn: false,
    isTyping: false
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
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
      })
      .catch(err => console.log(err));

    axios
      .get("/geo") // https://ssl.geoplugin.net/json.gp?k=get a key "https://ssl.geoplugin.net/json.gp?k=549c11e3f31b9c30"
      .then(resp => {
        const { country, region } = resp.data;
        this.getRooms();
        socket.emit("new_user", this.state.user);
        socket.on("users", users => {
          this.setState({
            onlineUsers: users,
            user: {
              ...this.props.user,
              isOnline: true,
              connection: {
                countryCode: country,
                city: region
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

        // socket.on("typing", () => {
        //   this.setState({
        //     isTyping: true
        //   });
        // });

        // socket.on("stopped-typing", () => {
        //   this.setState({
        //     isTyping: false
        //   });
        // });

        socket.on("welcome", message => {
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
    this.scrollToBottom();

    socket.emit("disconnect");

    socket.off();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleChange = event => {
    if (this.state.message) socket.emit("typing", "typing");
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmitLang = event => {
    event.preventDefault();
    this.setState(
      {
        defaultLanguage: event.target.value
      },
      () => {
        axios
          .post("/auth/updateLang", {
            id: this.state.user._id,
            defaultLanguage: this.state.defaultLanguage
          })
          .then(response => {})
          .catch(err => {
            if (err.response.data.message) {
              this.setState({
                error: err.response.data.message
              });
            }
          });
      }
    );
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
    let user2;
    if (this.state.user._id === room.users[0]._id) {
      user2 = room.users[1];
    } else {
      user2 = room.users[0];
    }

    socket.emit("joinRoom", {
      user: this.state.user,
      room: room._id
    });
    this.setState({
      roomId: room._id,
      user2: user2
    });
    this.getMessages(room);
  };

  joinPrivate = user2 => {
    socket.emit("joinPrivate", { user1: this.state.user, user2: user2 });
    this.setState({
      users: [],
      user2: user2,
      searchOn: false
    });
  };

  sendMessage = event => {
    event.preventDefault();
    if (this.state.message) {
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
    }
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

  userIsOnline = user => {
    const online = this.state.onlineUsers
      .map(x => {
        return x && x._id;
      })
      .includes(user._id);
    return online;
  };

  openSearch = () => {
    this.setState({
      searchOn: !this.state.searchOn
    });
  };

  // isTyping = () => {
  //   socket.emit("typing", this.state.user2);
  //   setTimeout(() => {
  //     socket.emit("stopped-typing", this.state.user2);
  //   }, 2000);
  // };

  render() {
    return (
      <div className="chat-container">
        {this.state.searchOn ? (
          <div className="rooms-container">
            <div className="search-container">
              <form onSubmit={this.searchUsers}>
                <div className="search-area">
                  <input
                    type="text"
                    placeholder="Insert username or email"
                    className="search-bar"
                    name="search"
                    id="search"
                    value={this.state.search}
                    onChange={this.handleChange}
                  />{" "}
                </div>
              </form>

              {this.state.users.map(user => {
                return (
                  <a classNameName="" onClick={() => this.joinPrivate(user)}>
                    <div key={user._id} className="room searched-user">
                      <img
                        src={user.profilePic}
                        alt="user"
                        className="profile-pic"
                      />

                      <h5>{user.username}</h5>
                      <img
                        className="dot"
                        src={
                          this.userIsOnline(user)
                            ? "green-dot.png"
                            : "red-dot.png"
                        }
                      />
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="search-footer">
              <span onClick={this.openSearch}>
                Go back <i class="fas fa-chevron-right"></i>
              </span>
            </div>
          </div>
        ) : (
          <div className="rooms-container">
            <div className="search-header">
              <button className="btn" onClick={this.openSearch}>
                Search for a user
              </button>
            </div>
            <Rooms
              user={this.state.user}
              rooms={this.state.rooms}
              users={this.state.users}
              onlineUsers={this.state.onlineUsers}
              joinRoom={this.joinRoom}
            />
            <div className="select-language">
              <label>Select your language</label>
              <select
                value={this.state.defaultLanguage}
                onChange={this.handleSubmitLang}
                name="defaultLanguage"
                class="form-control"
              >
                {Object.entries(this.state.listeLanguages).map(country => {
                  return (
                    <option key={country[0]}>
                      {country[0]} - {country[1].name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        <div className="messages-container">
          {/* <ScrollToBottom className="messages"> */}

          <div className="messages">
            {this.state.messages.map(msg => {
              return (
                <div>
                  <Message
                    user={this.state.user}
                    user2={this.state.user2}
                    msg={msg}
                    key={msg._id}
                  />
                </div>
              );
            })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </div>

          {/* </ScrollToBottom> */}

          <form className="message-area" onSubmit={this.sendMessage}>
            {this.state.isTyping ? <span> Is typing...</span> : <div></div>}
            <input
              type="text"
              name="message"
              id="message-text"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.isTyping}
              rows="2"
            />
            <button className="submit-message" type="submit">
              <i
                class="far fa-paper-plane send-plane fa-2x"
                aria-hidden="true"
              ></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Chat1;
