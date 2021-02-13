import { createStore, combineReducers, applyMiddleware } from '../redux';
import { printStart, thunk, promise, logger, printLast } from './middlewares';
import { counterReducer } from './counter';
import { helloReducer } from './hello';

const reducer = combineReducers({
  count: counterReducer,
  hello: helloReducer
});

const preloadedState = { count: { count: 1000 }, hello: { message: 'abc' } };

const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(printStart, thunk, promise, logger, printLast)
);

export default store;
