import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

// это для отладки на dev, а также чтобы показать что мы можем работать с этим объектом history напрямую без интеграции с "react-router-redux", просто импортим там где нужно и работаем как с history API
// window.routerHistory = history

export default history;
