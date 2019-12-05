import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div style={{ backgroundImage: "url('post.jpg')", padding: "20px" }}>
        <div className="container ">
          <Link
            style={{
              padding: "20px 20px",
              backgroundColor: "#808080",
              color: "white",
              margin: "0  auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "20%"
            }}
            to="/signup"
          >
            Signup
          </Link>
          <Link
            style={{
              padding: "20px 20px",
              backgroundColor: "#808080",
              color: "white",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "20%"
            }}
            to="/login"
          >
            Login
          </Link>
          <h2 style={{ color: "", textAlign: "center" }}>
            Never Been So Easy!
          </h2>
          <div>
            <CardDeck>
              <Card>
                <Card.Img variant="top" src="chats.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey" }}>Live Chat</Card.Title>
                  <Card.Text style={{ color: "coral" }}>
                    Simply Login or Join the Chatroom to chat Live.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="peoples.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey" }}>
                    Connect to people Globally
                  </Card.Title>
                  <Card.Text style={{ color: "coral" }}>
                    Connect to different countries and culture people all around
                    the World!
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="auto.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey" }}>
                    Auto-Translated
                  </Card.Title>
                  <Card.Text style={{ color: "coral" }}>
                    Get your messages translated on your selected Language and
                    Chat Live.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
