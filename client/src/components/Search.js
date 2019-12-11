import React, { Component } from "react";

state = {
  search: ""
};

class Search extends Component {
  render() {
    return (
      <div>
        <Col xs={3} className="bg-light">
          <Container>
            <h2>Users</h2>
            <form onSubmit={this.props.searchUsers}>
              <input
                type="text"
                name="search"
                id="search"
                value={this.state.search}
                onChange={this.props.handleChange}
              />
              <button className="btn btn-light ml-4" type="submit">
                Search
              </button>
            </form>

            {this.props.users.map(user => {
              if (
                this.props.onlineUsers
                  .map(x => {
                    return x && x._id;
                  })
                  .includes(user._id)
              ) {
                return (
                  <Col key={user._id}>
                    <Button
                      className="bg-success  m-2"
                      onClick={() => this.props.joinPrivate(user)}
                    >
                      {user.username}
                    </Button>
                  </Col>
                );
              } else {
                return (
                  <Col key={user._id}>
                    <Button
                      className="bg-danger  m-2"
                      onClick={() => this.props.joinPrivate(user)}
                    >
                      {user.username}
                    </Button>
                  </Col>
                );
              }
            })}
          </Container>
        </Col>
      </div>
    );
  }
}

export default Search;
