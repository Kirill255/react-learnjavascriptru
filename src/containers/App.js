import React, { Component } from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import Select from "react-select";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import ArticleList from "../components/ArticleList";
import UserForm from "../components/UserForm";
import "./App.css";

class App extends Component {
  static propTypes = {
    articles: PropTypes.array
  };

  static defaultProps = {
    numberOfMonths: 2
  };

  state = {
    selectedOption: null,
    from: undefined,
    to: undefined
  };

  handleDayClick = (day) => {
    const { from, to } = this.state;
    const range = DateUtils.addDayToRange(day, { from, to });
    this.setState(range);
  };
  handleResetClick = () => {
    this.setState({ from: undefined, to: undefined });
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log("Option selected: ", selectedOption);
  };

  render() {
    const { articles } = this.props;
    const { selectedOption, from, to } = this.state;
    const modifiers = { start: from, end: to };

    const options = articles.map((article) => ({
      label: article.title,
      value: article.id
    }));

    return (
      <div className="app">
        <UserForm />
        <Select value={selectedOption} onChange={this.handleChange} options={options} />
        <div className="RangeExample">
          <p>
            {!from && !to && "Please select the first day."}
            {from && !to && "Please select the last day."}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
            {from && to && (
              <button className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
          </p>
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />
        </div>
        <ArticleList articles={articles} defaultOpenId={articles[0].id} />
      </div>
    );
  }
}

export default hot(module)(App);
