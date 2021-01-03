import { createStore } from "redux";

export const ACTIONS = {
  SAVE_CONTAINER: "SAVE_CONTAINER",
};

const initialState = {
  containers: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SAVE_CONTAINER: {
      const { key, container } = action.payload;
      const { containers } = state;
      containers.push(container);
      return {
        ...state,
        containers: containers,
      };
    }
    default:
      return state;
  }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(reducer, enableReduxDevTools);
  return store;
}
