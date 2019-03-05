import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import Select from "react-select";
import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";

class App extends Component {
  static propTypes = {
    articles: PropTypes.array
  };

  state = {
    selectedOption: null
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log("Option selected: ", selectedOption);
  };

  render() {
    const { articles } = this.props;
    const { selectedOption } = this.state;

    const options = articles.map((article) => ({
      label: article.title,
      value: article.id
    }));

    return (
      <div>
        <UserForm />
        <Select value={selectedOption} onChange={this.handleChange} options={options} />
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default hot(module)(App);
