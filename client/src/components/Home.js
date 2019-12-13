import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

class Home extends Component {
  render() {
    return (
      <>
        <Carousel className="carouselMain" >
          <Carousel.Item>
            <img
              className="d-block carouselIMG"
              src="../globe2.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>GloChat</h3>
              <p>It's never been so easy !</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselIMG"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Simple</h3>
              <p>Simply Login with your google account or sign up.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselIMG"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Chat Globally</h3>
              <p>Connect to people from all around the World!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselIMG"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Auto-Translation</h3>
              <p>
                Let us take care of the rest and chat live in your mother tongue
                !
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div>
          <div className="home-container">
            {/* <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link> */}
            <h1>GloChat</h1>
            <h4>It's never been so easy !</h4>
            <div>
              <CardDeck className="card-container">
                <Card className="card-home">
                  <Card.Img
                    className="card-img"
                    variant="top"
                    src="chats.jpg"
                  />
                  <Card.Body>
                    <Card.Title>Simple</Card.Title>
                    <Card.Text>
                      Simply Login with your google account or sign up.
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
                    <Card.Title>Chat Globally</Card.Title>
                    <Card.Text>
                      Connect to people from all around the World!
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className="card-home">
                  <Card.Img className="card-img" variant="top" src="auto.jpg" />
                  <Card.Body>
                    <Card.Title>Auto-Translation</Card.Title>
                    <Card.Text>
                      Let us take care of the rest and chat live in your mother
                      tongue !
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
            </div>
          </div>

          <footer></footer>
        </div>
      </>
    );
  }
}
export default Home;
