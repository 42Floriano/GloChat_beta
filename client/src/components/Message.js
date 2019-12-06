import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map(msg => {
          return (
            <div key={msg._id} id="message" className="bg-light p-1">
              {msg.username} said "{msg.text}" at {msg.created_at}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Message;
