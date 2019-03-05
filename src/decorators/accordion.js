import React, { Component as ReactComponent } from "react";

export default (OriginalComponent) =>
  class Accordion extends ReactComponent {
    state = {
      openArticleId: null
    };

    toggleOpenArticle = (id) => (event) => {
      event && event.preventDefault && event.preventDefault();
      this.setState({ openArticleId: id });
    };

    render() {
      return (
        <OriginalComponent
          {...this.props}
          {...this.state}
          toggleOpenArticle={this.toggleOpenArticle}
        />
      );
    }
  };
