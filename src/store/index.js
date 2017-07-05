const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(combineReducers({
  ...reducers,
  router: routerReducer
}), applyMiddleware(middleware))