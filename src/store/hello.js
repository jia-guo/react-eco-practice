const UPDATE_MESSAGE = 'HELLO/UPDATE_MESSAGE';

export const updateHelloMessage = (newMsg) => ({
  type: UPDATE_MESSAGE,
  payload: newMsg
});

const defaultState = {
  message: 'hello'
};

export function helloReducer(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return { message: action.payload };
    default:
      return state;
  }
}
