import React, { Component as ReactComponent } from "react";

export default (OriginalComponent) =>
  class WrappedComponent extends ReactComponent {
    state = {
      isOpen: false
    };

    componentDidMount() {
      console.log("mount");
    }
    componentDidUpdate() {
      console.log("update");
    }
    componentWillUnmount() {
      console.log("unmount");
    }

    toggleOpen = (event) => {
      event && event.preventDefault && event.preventDefault();
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    render() {
      return <OriginalComponent {...this.props} {...this.state} toggleOpen={this.toggleOpen} />;
    }
  };
