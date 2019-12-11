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
      })
      .catch(err => console.log(err));

    socket.emit("disconnect");

    socket.off();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
    console.log(this.state);
    return (
      <Container>
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
          <Col xs={6} id="chat" className="bg-primary">
            <ScrollToBottom className="messages">
              {this.state.messages.map(msg => {
                return (
                  <Message user={this.state.user} msg={msg} key={msg._id} />
                );
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
                Send
              </button>
            </form>
          </Col>
          <Users rooms={this.state.rooms} joinRoom={this.joinRoom} />
        </Row>
      </Container>
    );
  }
}

export default Chat;
