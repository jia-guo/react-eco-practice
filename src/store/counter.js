// action
const COUNTER_ADD = 'COUNTER/ADD';
const COUNTER_MINUS = 'COUNTER/MINUS';

// action creator
export const increCounter = () => ({
  type: COUNTER_ADD
});
export const decreCounter = () => ({
  type: COUNTER_MINUS
});

// initial state
const defaultState = {
  count: 0
};

// reducer
export const counterReducer = (state = defaultState, action) => {
  console.log('counter reducer', state);
  switch (action.type) {
    case COUNTER_ADD:
      return { count: state.count + 1 };
    case COUNTER_MINUS:
      return { count: state.count - 1 };
    default:
      return state;
  }
};
