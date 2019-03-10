import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import history from "../history";
import reducer from "../reducer";
import logger from "../middlewares/logger";
import randomId from "../middlewares/randomId";
import api from "../middlewares/api";

const enhancer = applyMiddleware(thunk, routerMiddleware(history), randomId, api, logger);
const store = createStore(reducer, {}, enhancer);

// dev only, нужно не забыть это убрать на prod!!!
// store.getState() в консоли браузера
window.store = store;

export default store;
