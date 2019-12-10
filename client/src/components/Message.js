import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div>
        <div key={this.props.msg._id} id="message" className="bg-light p-1">
          {this.props.msg.username} said "{this.props.msg.text}" at{" "}
          {this.props.msg.created_at}
        </div>
      </div>
    );
  }
}

export default Message;
