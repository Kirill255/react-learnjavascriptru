import React, { Component } from "react";
import { connect } from "react-redux";
import { addComment } from "../../action";
import "./CommentForm.css";

const limits = {
  user: {
    min: 5,
    max: 15
  },
  text: {
    min: 20,
    max: 50
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchAddComment: (comment) => dispatch(addComment(comment, ownProps.articleId))
  };
};

class CommentForm extends Component {
  state = {
    user: "",
    text: ""
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
    if (!this.state.user.length || !this.state.text.length) {
      console.log("Заполните поля");
    } else {
      this.props.dispatchAddComment(this.state);
      this.setState({
        user: "",
        text: ""
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
            className={this.getClassName("text")}
            value={this.state.text}
            onChange={this.handleChange("text")}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm);
