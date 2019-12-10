import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Chat extends Component {
  state = {};

  render() {
    return (

      <div id="chatBody">
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
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status online"></span>
                    <img
                      src="http://emilcarlsson.se/assets/louislitt.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Louis Litt</p>
                      <p className="preview">You just got LITT up, Mike.</p>
                    </div>
                  </div>
                </li>
                <li className="contact active">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src="http://emilcarlsson.se/assets/harveyspecter.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Harvey Specter</p>
                      <p className="preview">
                        Wrong. You take the gun, or you pull out a bigger one.
                        Or, you call their bluff. Or, you do any one of a
                        hundred and forty six other things.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status away"></span>
                    <img
                      src="http://emilcarlsson.se/assets/rachelzane.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Rachel Zane</p>
                      <p className="preview">
                        I was thinking that we could have chicken tonight,
                        sounds good?
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status online"></span>
                    <img
                      src="http://emilcarlsson.se/assets/donnapaulsen.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Donna Paulsen</p>
                      <p className="preview">
                        Mike, I know everything! I'm Donna..
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src="http://emilcarlsson.se/assets/jessicapearson.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Jessica Pearson</p>
                      <p className="preview">
                        Have you finished the draft on the Hinsenburg deal?
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/haroldgunderson.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Harold Gunderson</p>
                      <p className="preview">Thanks Mike! :)</p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/danielhardman.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Daniel Hardman</p>
                      <p className="preview">
                        We'll meet again, Mike. Tell Jessica I said 'Hi'.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status busy"></span>
                    <img
                      src="http://emilcarlsson.se/assets/katrinabennett.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Katrina Bennett</p>
                      <p className="preview">
                        I've sent you the files for the Garrett trial.
                      </p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/charlesforstman.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Charles Forstman</p>
                      <p className="preview">Mike, this isn't over.</p>
                    </div>
                  </div>
                </li>
                <li className="contact">
                  <div className="wrap">
                    <span className="contact-status"></span>
                    <img
                      src="http://emilcarlsson.se/assets/jonathansidwell.png"
                      alt=""
                    />
                    <div className="meta">
                      <p className="name">Jonathan Sidwell</p>
                      <p className="preview">
                        <span>You:</span> That's bullshit. This deal is solid.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div id="bottom-bar">
              <button id="addcontact">
                <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
                <span>Add contact</span>
              </button>
              <button id="settings">
                <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
                <span>Settings</span>
              </button>
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
        </div>
    );
  }
}

export default Chat;
