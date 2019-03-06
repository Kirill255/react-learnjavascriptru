import React, { Component } from "react";
import PropTypes from "prop-types";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { changeDateRange, resetDateRange } from "../../../action";
import "./DateRange.css";

const mapStateToProps = (state) => {
  return {
    dateRange: state.filters.dateRange
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDayClick: (dateRange, day) => {
      const range = DateUtils.addDayToRange(day, dateRange);
      dispatch(changeDateRange(range));
    },
    handleResetClick: () => dispatch(resetDateRange())
  };
};

class DateRange extends Component {
  static propTypes = {
    // from connect
    dateRange: PropTypes.object,
    handleDayClick: PropTypes.func
  };

  static defaultProps = {
    numberOfMonths: 2
  };

  render() {
    const {
      dateRange: { from, to },
      handleDayClick,
      handleResetClick
    } = this.props;
    const { dateRange } = this.props; // нужен сам объект тоже для handleDayClick
    const modifiers = { start: from, end: to };

    // note: onDayClick={(day) => handleDayClick(dateRange, day)}
    // функция onDayClick первым аргументом возвращает как и всегда объект event, но она его подменяет своими данными, в данным случае она возвращает day
    // мы могли бы написать так onDayClick={handleDayClick} и тогда тоже первым аргументом пришёл бы объект event (как и всегда), но тоже подмененный самой библиотекой

    return (
      <div className="RangeExample">
        <p>
          {!from && !to && "Please select the first day."}
          {from && !to && "Please select the last day."}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
          {from && to && (
            <button className="link" onClick={handleResetClick}>
              Reset
            </button>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={(day) => handleDayClick(dateRange, day)}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateRange);
