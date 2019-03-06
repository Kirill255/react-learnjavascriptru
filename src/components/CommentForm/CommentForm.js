import React, { Component } from "react";
import "./CommentForm.css";

const limits = {
  user: {
    min: 5,
    max: 15
  },
  comment: {
    min: 20,
    max: 50
  }
};

export default class CommentForm extends Component {
  state = {
    user: "",
    comment: ""
  };

  getClassName = (type) =>
    this.state[type].length && this.state[type].length < limits[type].min
      ? "form-input__error"
      : "";

  handleChange = (type) => (event) => {
    if (event.target.value.length > limits[type].max) return;
    this.setState({ [type]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.user.length || !this.state.comment.length) {
      console.log("Заполните поля");
    } else {
      console.log(this.state);
      this.setState({
        user: "",
        comment: ""
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="user">User:</label>
          <input
            id="user"
            type="text"
            className={this.getClassName("user")}
            value={this.state.user}
            onChange={this.handleChange("user")}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            id="comment"
            type="text"
            className={this.getClassName("comment")}
            value={this.state.comment}
            onChange={this.handleChange("comment")}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
