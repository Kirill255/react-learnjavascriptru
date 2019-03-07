import React, { Component } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeSelection } from "../../action";

const mapStateToProps = (state) => {
  return {
    selectedOption: state.filters.selectedOption
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChangeSelect: (selectedOption) =>
      dispatch(changeSelection(selectedOption.map((option) => option.value)))
  };
};

class SelectFilter extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    // from connect
    selectedOption: PropTypes.array,
    handleChangeSelect: PropTypes.func
  };

  render() {
    const { articles, selectedOption, handleChangeSelect } = this.props;
    const options = articles.map((article) => ({
      label: article.title,
      value: article.id
    }));

    return (
      <div>
        <Select
          setValue={selectedOption}
          onChange={handleChangeSelect}
          options={options}
          isMulti={true}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectFilter);
