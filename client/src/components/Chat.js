import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    search: ""
  };

  componentDidMount = () => {
    axios
      .get("http://geoplugin.net/json.gp")
      .then(resp => {
        const { geoplugin_countryCode, geoplugin_city } = resp.data;

        axios.get("/rooms").then(res => {
          socket.emit("new_user", this.state.user);
          socket.on("users", users => {
            this.setState({
              onlineUsers: users,
              rooms: res.data,
              user: {
                ...this.props.user,
                isOnline: true,
                connection: {
                  socketId: socket.id,
                  countryCode: geoplugin_countryCode,
                  city: geoplugin_city
                }
              }
            });
          });
        });

        socket.on("message", message => {
          console.log(message);
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
  };

  joinPrivate = user => {
    console.log(user);
    socket.emit("joinPrivate", { user1: this.state.user, user2: user });
    socket.on("welcome", message => {
      console.log(message);
    });
    socket.on("room", room => {
      console.log(room);
      this.setState(
        {
          roomId: room[0]._id
        },
        () => this.getMessages(room[0])
      );
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
    console.log("GETMESSAGES", room);
    axios
      .get(`/messages/${room._id}`)
      .then(res => {
        this.setState({
          messages: res.data
        });
        this.joinRoom(room);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Row
          className="mt-4"
          style={{
            height: "500px"
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
                  //this.state.onlineUsers &&
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
            {this.state.messages.map(msg => {
              return <Message msg={msg} key={msg._id} />;
            })}
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
          </Col>
          <Users rooms={this.state.rooms} getMessages={this.getMessages} />
        </Row>
      </Container>
    );
  }
}

export default Chat;
