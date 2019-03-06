import React, { Component } from "react";
import PropTypes from "prop-types";
import DateRange from "./DateRange/DateRange";
import SelectFilter from "./SelectFilter";

class Filters extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  };

  render() {
    const { articles } = this.props;
    return (
      <div>
        <SelectFilter articles={articles} />
        <DateRange />
      </div>
    );
  }
}

export default Filters;
