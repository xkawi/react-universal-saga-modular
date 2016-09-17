const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  const res = {};
  //eslint-disable-next-line
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export function action(type, payload = {}) {
  return { type, ...payload };
}

export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';
export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

export const updateRouterState = (state) => action(UPDATE_ROUTER_STATE, { state });
export const navigate = (pathname) => action(NAVIGATE, { pathname });
export const resetErrorMessage = () => action(RESET_ERROR_MESSAGE);
