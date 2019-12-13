import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          {/* <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link> */}
          <h1>GloChat</h1>
          <h4>Never Been So Easy!</h4>
          <div>
            <CardDeck className="card-container">
              <Card className="card-home">
                <Card.Img className="card-img" variant="top" src="chats.jpg" />
                <Card.Body>
                  <Card.Title>Live Chat</Card.Title>
                  <Card.Text>
                    Simply Login or Join the Chatroom to chat Live.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card-home">
                <Card.Img
                  className="card-img"
                  variant="top"
                  src="peoples.jpg"
                />
                <Card.Body>
                  <Card.Title>Connect to people Globally</Card.Title>
                  <Card.Text>
                    Connect to different countries and culture people all around
                    the World!
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card-home">
                <Card.Img className="card-img" variant="top" src="auto.jpg" />
                <Card.Body>
                  <Card.Title>Auto-Translated</Card.Title>
                  <Card.Text>
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
