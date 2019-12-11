import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import axios from "axios";
import Users from "./Users";
import Message from "./Message";

const endpoint = "http://localhost:5000";

let socket = io(endpoint);

class Chat extends Component {
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
      <div class="messaging">
        <div class="inbox_msg">
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="recent_heading"></div>
              <div class="srch_bar">
                <div class="stylish-input-group">
                  <form onSubmit={this.searchUsers}>
                    <input
                      class="search-bar"
                      placeholder="Search"
                      type="text"
                      name="search"
                      id="search"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                  </form>

                  {this.state.users.map(user => {
                    if (
                      this.state.onlineUsers
                        .map(x => {
                          return x && x._id;
                        })
                        .includes(user._id)
                    ) {
                      return (
                        <Col key={user._id}>
                          <Button
                            className="bg-success  m-2"
                            onClick={() => this.joinPrivate(user)}
                          >
                            {user.username}
                          </Button>
                        </Col>
                      );
                    } else {
                      return (
                        <Col key={user._id}>
                          <Button
                            className="bg-danger  m-2"
                            onClick={() => this.joinPrivate(user)}
                          >
                            {user.username}
                          </Button>
                        </Col>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            <div class="inbox_chat scroll">
              <Users
                user={this.state.user}
                rooms={this.state.rooms}
                users={this.state.users}
                onlineUsers={this.state.onlineUsers}
                joinRoom={this.joinRoom}
              />
            </div>
          </div>
          <div class="mesgs">
            <div class="msg_history">
              <div class="incoming_msg">
                <div class="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>Test which is a new approach to have all solutions</p>
                    <span class="time_date"> 11:01 AM | June 9</span>
                  </div>
                </div>
              </div>
              <div class="outgoing_msg">
                <div class="sent_msg">
                  <p>Test which is a new approach to have all solutions</p>
                  <span class="time_date"> 11:01 AM | June 9</span>{" "}
                </div>
              </div>
              <div class="incoming_msg">
                <div class="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>Test, which is a new approach to have</p>
                    <span class="time_date"> 11:01 AM | Yesterday</span>
                  </div>
                </div>
              </div>
              <div class="outgoing_msg">
                <div class="sent_msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time_date"> 11:01 AM | Today</span>{" "}
                </div>
              </div>
              <div class="incoming_msg">
                <div class="incoming_msg_img">
                  {" "}
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />{" "}
                </div>
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>
                      We work directly with our designers and suppliers, and
                      sell direct to you, which means quality, exclusive
                      products, at a price anyone can afford.
                    </p>
                    <span class="time_date"> 11:01 AM | Today</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input
                  type="text"
                  class="write_msg"
                  placeholder="Type a message"
                />
                <button class="msg_send_btn" type="button">
                  <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;

{
  /* <Container>
  <Row
    className="mt-4"
    style={{
      height: "550px"
    }}
  >
    <Col xs={3} className="bg-light">
      <Container>
        <h2>Users</h2>
        <form onSubmit={this.searchUsers}>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button className="btn btn-light ml-4" type="submit">
            Search
          </button>
        </form>

        {this.state.users.map(user => {
          if (
            this.state.onlineUsers
              .map(x => {
                return x && x._id;
              })
              .includes(user._id)
          ) {
            return (
              <Col key={user._id}>
                <Button
                  className="bg-success  m-2"
                  onClick={() => this.joinPrivate(user)}
                >
                  {user.username}
                </Button>
              </Col>
            );
          } else {
            return (
              <Col key={user._id}>
                <Button
                  className="bg-danger  m-2"
                  onClick={() => this.joinPrivate(user)}
                >
                  {user.username}
                </Button>
              </Col>
            );
          }
        })}
      </Container>
    </Col>
    <Users rooms={this.state.rooms} joinRoom={this.joinRoom} />

    <Col sm={9} id="chat" className="messages">
      <ScrollToBottom>
        {this.state.messages.map(msg => {
          return <Message user={this.state.user} msg={msg} key={msg._id} />;
        })}
      </ScrollToBottom>

      <form onSubmit={this.sendMessage}>
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

      <form onSubmit={this.handleSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label style={{ fontWeight: "500" }}>
            Select your language
          </Form.Label>

          <Form.Control
            as="select"
            value={this.state.defaultLanguage}
            onChange={this.handleChange}
            name="defaultLanguage"
          >
            {Object.entries(this.state.listeLanguages).map(country => {
              return (
                <option key={country[0]}>
                  {" "}
                  {country[0]} - {country[1].name}{" "}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <button className="btn btn-light ml-4" type="submit">
          Change language
        </button>
      </form>
    </Col>
  </Row>
</Container>;  */
}
