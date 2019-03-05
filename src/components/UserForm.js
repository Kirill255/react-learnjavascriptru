import React, { Component } from "react";

export default class UserForm extends Component {
  state = {
    username: ""
  };

  handleUserChange = (event) => {
    if (event.target.value.length > 10) return;
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div>
        <label htmlFor="username">Name:</label>
        <input
          id="username"
          type="text"
          value={this.state.username}
          onChange={this.handleUserChange}
        />
      </div>
    );
  }
}
