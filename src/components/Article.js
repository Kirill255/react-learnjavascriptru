import React, { Component } from "react";

export default class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  }

  getBody() {
    if (!this.state.isOpen) return null;
    const { article } = this.props;
    return <section>{article.text}</section>;
  }

  toggleOpen = (event) => {
    event.preventDefault();
    console.log("---", event.nativeEvent);
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { article } = this.props;
    const { isOpen } = this.state;
    return (
      <div>
        <h3>{article.title}</h3>
        <button onClick={this.toggleOpen}>{isOpen ? "close" : "open"}</button>
        {this.getBody()}
      </div>
    );
  }
}
