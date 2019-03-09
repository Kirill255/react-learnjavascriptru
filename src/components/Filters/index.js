import React, { Component } from "react";
import PropTypes from "prop-types";
import DateRange from "./DateRange/DateRange";
import SelectFilter from "./SelectFilter";
import { connect } from "react-redux";
import { mapToArr } from "../../helpers";

const mapStateToProps = (state) => {
  return {
    articles: mapToArr(state.articles.entities)
  };
};

class Filters extends Component {
  static propTypes = {
    // from connect
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

export default connect(mapStateToProps)(Filters);
