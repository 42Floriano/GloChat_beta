import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
// import Chat from "./components/Chat";
import ChatTest from './components/ChatTest';
import Room from './components/Room';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
	state = {
		user: this.props.user
	};

	setUser = (user) => {
		this.setState({
			user: user
		});
	};

	render() {
		console.log(this.props);
		return (
			<div className="App">
				<NavBar user={this.state.user} clearUser={this.setUser} />

				{this.state.user ? (
					// <React.Fragment>
					<Route
						exact
						path="/"
						render={(props) => (
							<div className="container">
								<div
									className="row mt-4"
									style={{
										height: '550px'
									}}
								>
									<ChatTest user={this.state.user} {...props} />
								</div>
							</div>
						)}
					/>
				) : (
					/* <Route
              exact
              path="/:roomId"
              render={props => (
                <div className="container">
                  <div
                    className="row mt-4"
                    style={{
                      height: "550px"
                    }}
                  >
                    <ChatTest user={this.state.user} {...props} />
                    <Room user={this.state.user} {...props} />
                  </div>
                </div>
              )}
            />
          </React.Fragment> */
					<Route exact path="/" component={Home} />
				)}
				<Route
					exact
					path="/login"
					render={(props) => <Login user={this.state.user} setUser={this.setUser} {...props} />}
				/>
				<Route
					exact
					path="/signup"
					render={(props) => <Signup user={this.state.user} setUser={this.setUser} {...props} />}
				/>
				{/* <Route exact path="/chat" component={Chat} /> */}
			</div>
		);
	}
}

export default App;
