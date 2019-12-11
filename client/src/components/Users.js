import React, { Component } from "react";
import { Button, Col } from "react-bootstrap";

class Users extends Component {
  getCountyFlag = countryCode =>
    `https://www.countryflags.io/${countryCode}/flat/64.png`;

  render() {
    return (
      <Col xs={3} className="bg-secondary">
        <h2>Conversations</h2>
        {this.props.rooms.map(room => {
          return (
            <Col key={room._id}>
              <Button onClick={() => this.props.joinRoom(room)}>
                {room.users.map(user => `${user.username} `)}
              </Button>
            </Col>
          );
        })}
      </Col>
    );
  }
}

export default Users;

{
  /* <React.Fragment>
<Table>
  <thead>
    <tr>
      <th>UserName</th>
      <th>Flag</th>
      <th>City</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {this.props.users.map((user, index) => {
      // if (user._id !== this.props.user._id) {
      return (
        <tr key={index}>
          <td>{user.username}</td>
          <td>
            <img
              src={this.getCountyFlag(user.connection.countryCode)}
              alt="flag"
            />
          </td>
          <td>{user.connection.city}</td>
          <td>
            <Button onClick={() => this.props.toPrivate(user)}>
              <Link className="text-white" to={`/`}>
                Chat
              </Link>
            </Button>
          </td>
        </tr>
      );
      //}
    })}
  </tbody>
</Table>
</React.Fragment> */
}
