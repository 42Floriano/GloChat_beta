import React, { Component } from "react";

const Message = props => {
  const msg = props.msg;
  const user = props.user;
  console.log("HEY LLOOOOOOOOOK AT USER", user.username);
  console.log("HEY LLOOOOOOOOOK AT MSG", msg.username);
  console.log(props);

  return (
    <>
      {user.username == msg.username ? (
        <div class="outgoing_msg">
          <div key={msg._id} id="message" className="sent_msg">
            <p>{user.username === msg.username ? msg.text : msg.translation}</p>
            <span class="time_date"> {msg.created_at} </span>
          </div>
        </div>
      ) : (
        <div class="incoming_msg">
          <div class="incoming_msg_img">
            {" "}
            <img
              src="https://ptetutorials.com/images/user-profile.png"
              alt="sunil"
            />{" "}
          </div>
          <div class="received_msg">
            <div key={msg._id} id="message" class="received_withd_msg">
              <p>
                {user.username === msg.username ? msg.text : msg.translation}
              </p>
              <span class="time_date"> {msg.created_at} </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
