import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div style={{ backgroundImage: "url('walls.jpg')", padding: "20px" }}>
        <div className="container ">
          <Link
            style={{
              padding: "20px 20px",
              backgroundColor: "crimson",
              color: "white",
              margin: "0  auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              width: "20%",
              textDecoration: "none"
            }}
            to="/signup"
          >
            Signup
          </Link>
          <Link
            style={{
              padding: "20px 20px",
              backgroundColor: "crimson",
              color: "white",
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "20%",
              textDecoration: "none"
            }}
            to="/login"
          >
            Login
          </Link>
          <h2 style={{ color: "white", textAlign: "center" }}>
            Never Been So Easy!
          </h2>
          <div>
            <CardDeck>
              <Card>
                <Card.Img variant="top" src="chats.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey", fontSize: "1.5em" }}>
                    Live Chat
                  </Card.Title>
                  <Card.Text style={{ color: "#1D2951", fontSize: "1.1em" }}>
                    Simply Login or Join the Chatroom to chat Live.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="peoples.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey", fontSize: "1.5em" }}>
                    Connect to people Globally
                  </Card.Title>
                  <Card.Text style={{ color: "#1D2951", fontSize: "1.1em" }}>
                    Connect to different countries and culture people all around
                    the World!
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Img variant="top" src="auto.jpg" />
                <Card.Body>
                  <Card.Title style={{ color: "grey", fontSize: "1.5em" }}>
                    Auto-Translated
                  </Card.Title>
                  <Card.Text style={{ color: "#1D2951", fontSize: "1.1em" }}>
                    Get your messages translated on your selected Language and
                    Chat Live.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </div>
        <footer>
          <p
            style={{
              color: "white",
              textAlign: "center",
              padding: "20px 20px",
              fontSize: "20px"
            }}
          >
            Developed by: Davide Bernocchi, Floriano Albertini and Madhavi
            Yalamanchili
          </p>
        </footer>
      </div>
    );
  }
}
export default Home;
