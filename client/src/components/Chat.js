import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Chat extends Component {

  state = {
  };


  render() {

    return (

      <div id="frame">
      <div id="sidepanel">

      {/* --------- Own profile -----------*/}

        <div id="profile">
          <div class="wrap">
            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
            <p>Mike Ross</p>
            <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
              </ul>
            </div>
            <div id="expanded">
              <label for="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
              <input name="twitter" type="text" value="mikeross" />
              <label for="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
              <input name="twitter" type="text" value="ross81" />
              <label for="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
              <input name="twitter" type="text" value="mike.ross" />
            </div>
          </div>
        </div>
        <div id="search">
          <label for=""><i className="fa fa-search" aria-hidden="true"></i></label>
          <input type="text" placeholder="Search contacts..." />
        </div>

        { /* --------- Room list -----------*/}
        <div id="contacts">
          <ul>
            <li className="contact">
              <div className="wrap">
                <div className="meta">
                  <p className="name">Room 1</p>
                </div>
              </div>
            </li>     
          </ul>
        </div>

        { /* --------- Contact liost -----------*/}
        <div id="contacts">
          <ul>
            <li className="contact">
              <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                <div className="meta">
                  <p className="name">Louis Litt</p>
                  <p className="preview">You just got LITT up, Mike.</p>
                </div>
              </div>
            </li>     
          </ul>
        </div>


        {/*------------ Settings webcam, mic and co... -----------------*/}
        <div id="bottom-bar">
          <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
        </div>
      </div>


        {/*--------------- The contact or group you chat with  ------------------------ */}


      <div className="content">
        <div className="contact-profile">
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
          <p>Harvey Specter</p>
          <div className="social-media">
            <i className="fa fa-facebook" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
             <i className="fa fa-instagram" aria-hidden="true"></i>
          </div>
        </div>


        {/* --------- Conversation ----------- */}
        <div className="messages">
          <ul>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>Message 1</p>
            </li>
            <li className="replies">
              <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
              <p>answer 1</p>
            </li>
            <li className="replies">
              <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
              <p>answer 2</p>
            </li>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>Oh yeah, did Michael Jordan tell you th?</p>
            </li>
          </ul>
        </div>

        <div className="message-input">
          <div className="wrap">
          <input type="text" placeholder="Write your message..." />
          <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Send </button>
          <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Select Language </button>
          </div>
        </div>
      </div>
    </div>

    );
  }
}

export default Chat;
