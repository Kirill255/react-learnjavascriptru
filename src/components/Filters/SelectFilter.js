import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

export default class SelectFilter extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  state = {
    selectedOption: []
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
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          isMulti={true}
        />
      </div>
    );
  }
}
