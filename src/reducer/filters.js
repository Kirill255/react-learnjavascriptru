import { CHANGE_SELECTION, CHANGE_DATE_RANGE, RESET_DATE_RANGE } from "../constants";

const defaultFilters = {
  selectedOption: [],
  dateRange: {
    from: null,
    to: null
  }
};

export default (filtersState = defaultFilters, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SELECTION:
      return { ...filtersState, selectedOption: payload.selectedOption };

    case CHANGE_DATE_RANGE:
      return { ...filtersState, dateRange: payload.dateRange };
    // return Object.assign({}, filtersState, { dateRange: payload.dateRange });

    case RESET_DATE_RANGE:
      return { ...filtersState, dateRange: { from: null, to: null } };
  }

  return filtersState;
};
