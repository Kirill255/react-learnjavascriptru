import React, { Component as ReactComponent } from "react";

export default (OriginalComponent) =>
  class Accordion extends ReactComponent {
    static defaultProps = {
      defaultOpenId: "56c782f18990ecf954f6e027"
    };

    constructor(props) {
      super(props);

      this.state = {
        openArticleId: props.defaultOpenId
      };
    }

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
