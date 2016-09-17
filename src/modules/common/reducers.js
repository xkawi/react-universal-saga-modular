import * as ActionTypes from './actions';

// Updates error message to notify about the failed fetches.
export const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

export const router = (state = { pathname: '/' }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state;
    default:
      return state;
  }
};

export default {
  errorMessage,
  router
};
