import isPromise from 'is-promise';

export function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      const returnVal = action(dispatch, getState);
      console.log('thunk fn returnval', returnVal);
      return returnVal;
    } else {
      const returnVal = next(action);
      console.log('thunk direct returnval', returnVal);
      return returnVal;
    }
  };
}

export function logger({ getState }) {
  return (next) => (action) => {
    console.group(`action ${action.type}`);
    console.log(`prev state:`, getState());
    console.log(`action`, action);
    const returnVal = next(action);
    console.log(`next state:`, getState());
    console.groupEnd();
    return returnVal;
  };
}

export function promise({ dispatch }) {
  return (next) => (action) => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
}
export const printStart = () => (next) => (action) => {
  console.log('----------');
  const val = next(action);
  console.log('----------', val);
  return val;
};

export const printLast = () => (next) => (action) => {
  console.log('==========');
  return next(action);
};
