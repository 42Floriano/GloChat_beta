import React, { Component } from "react";

const Message = props => {
  const msg = props.msg;
  const user = props.user;
  console.log(user);
  console.log(msg);
  return (
    <div>
      <div key={msg._id} id="message" className="bg-light p-1">
        {msg.username} said "
        {user.username === msg.username ? msg.text : msg.translation}" at
        {msg.created_at}
      </div>
    </div>
  );
};

export default Message;
