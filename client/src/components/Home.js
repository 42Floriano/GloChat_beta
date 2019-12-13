import React, { Component } from "react";
import { Card, CardDeck } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

class Home extends Component {
  render() {
    return (
      <>
        <Carousel className="carouselMain">
          <Carousel.Item>
            <img
              className="d-block carouselIMG"
              src="../globe2.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="caption">
              <h3>GloChat</h3>
              <p>It's never been so easy !</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block  carouselIMG"
              src="../googleLogo.png"
              alt="Second slide"
            />

            <Carousel.Caption className="caption">
              <h3>Simple</h3>
              <p>Simply log in with your google account or sign up.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block carouselIMGThree"
              src="../chatLogo3.png"
              alt="Third slide"
            />

            <Carousel.Caption className="caption">
              <h3>Chat Globally</h3>
              <p>Connect to people from all around the World.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block  carouselIMG"
              src="../translation.png"
              alt="Third slide"
            />

            <Carousel.Caption className="caption">
              <h3>Auto-Translation</h3>
              <p>
                Let us take care of everything and chat live in your mother tongue. <br></br>
                We speak more than 90 languages !
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
  }
}
export default Home;
