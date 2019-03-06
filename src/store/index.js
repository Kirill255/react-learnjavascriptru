import { createStore } from "redux";
import reducer from "../reducer";

const store = createStore(reducer);

// dev only, нужно не забыть это убрать на prod!!!
window.store = store;

export default store;
