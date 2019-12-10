import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import Room from './Room';

class ChatTest extends Component {
	state = {
		message: '',
		user: this.props.user,
		rooms: [],
		roomName: '',
		messages: [],
		socketId: ''
	};

	componentDidMount = () => {
		axios
			.get('/getRooms')
			.then((res) => {
				this.setState({
					rooms: res.data
				});
			})
			.catch((err) => console.log(err));
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleRoomSubit = (event) => {
		event.preventDefault();
		axios
			.post('/room', { userId: this.state.user._id, name: this.state.roomName })
			.then((res) => {
				this.setState({
					rooms: [ ...this.state.rooms, res.data ]
				});
			})
			.catch((err) => console.log(err));
	};

	handleRoom = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		// this.setState({
		//   room:
		// })
	};

	render() {
		return (
			<React.Fragment>
				<div className="col-sm-3 bg-primary">
					<h2>Rooms</h2>
					<form onSubmit={this.handleRoomSubit}>
						<input
							type="text"
							name="roomName"
							id="roomName"
							value={this.props.roomName}
							onChange={this.handleChange}
						/>
						<button className="btn btn-light mt-2" type="submit">
							Create a room
						</button>
					</form>
					<div>
						{this.state.rooms.map((room) => {
							return (
								<p>
									<Link className="text-white" to={`/${room._id}`}>
										{room.name}
									</Link>
								</p>
							);
						})}
					</div>
				</div>
				{this.state.room && <Room user={this.state.user} />}
			</React.Fragment>
		);
	}
}

export default ChatTest;
