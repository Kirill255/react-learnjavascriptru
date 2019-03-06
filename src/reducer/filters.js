import { CHANGE_SELECTION } from "../constants";

const defaultFilters = {
  selectedOption: []
};

export default (filtersState = defaultFilters, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_SELECTION:
      return { ...filtersState, selectedOption: payload.selectedOption };
  }

  return filtersState;
};
