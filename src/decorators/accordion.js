import React, { Component as ReactComponent } from "react";

export default (OriginalComponent) =>
  class Accordion extends ReactComponent {
    state = {
      openArticleId: null
    };

    toggleOpenArticle = (id) => (event) => {
      event && event.preventDefault && event.preventDefault();
      // раньше было, что при клике статья открывалась и всё, а теперь при клике статья открывается и при повторном клике статья закрывается
      this.setState({ openArticleId: id === this.state.openArticleId ? null : id });
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