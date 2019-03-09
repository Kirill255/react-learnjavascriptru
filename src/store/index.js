import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../reducer";
import logger from "../middlewares/logger";
import randomId from "../middlewares/randomId";
import api from "../middlewares/api";

const enhancer = applyMiddleware(thunk, randomId, api, logger);
const store = createStore(reducer, {}, enhancer);

// dev only, нужно не забыть это убрать на prod!!!
window.store = store;

export default store;
