import React, { Component } from "react";

export default class UserForm extends Component {
  handleUserChange = (event) => {
    if (event.target.value.length > 10) return;
    this.props.onChange(event.target.value);
  };

  render() {
    return (
      <div>
        <label htmlFor="username">Name:</label>
        <input
          autoComplete="off"
          id="username"
          type="text"
          value={this.props.username}
          onChange={this.handleUserChange}
        />
      </div>
    );
  }
}
