import React from "react";
import Chat from "./components/Chat";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  render() {
    return (
      <div className="App">
        <Navbar></Navbar>


      </div>
    );
  }
}

export default App;
