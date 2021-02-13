export function createStore(reducer, preloadedState, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let state = preloadedState;
  const subscribers = new Set();

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach((cb) => cb());
    return action;
  };

  const subscribe = (cb) => {
    subscribers.add(cb);
    console.log('subscribers after insertion', subscribers);
    return () => {
      subscribers.delete(cb);
      console.log('subscribers after deletion', subscribers);
    };
  };

  dispatch({ type: 'I am very unique' });

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch = () => {
      throw new Error('not done constructing middlewares');
    };
    const middlewareAPI = { getState: store.getState, dispatch: (...args) => dispatch(...args) };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

function compose(...fns) {
  if (fns.length === 0) {
    return (...args) => args;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

export function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = {};

    const reducerKeys = Object.keys(reducers);
    reducerKeys.forEach((key) => {
      const reducerForKey = reducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducerForKey(prevStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || prevStateForKey !== nextStateForKey;
    });

    hasChanged = hasChanged || reducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

export function bindActionCreators(actionCreators, dispatch) {
  const bindedActionCreators = Object.create(null);
  Object.keys(actionCreators).forEach((key) => {
    bindedActionCreators[key] = bindActionCreator(actionCreators[key], dispatch);
  });
  return bindedActionCreators;
}

function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
