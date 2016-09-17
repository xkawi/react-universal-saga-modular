/* eslint-disable no-constant-condition */
import { take } from 'redux-saga/effects';
import { history } from 'services';
import * as actions from './actions';

/**
 ****************************** WATCHERS ***********************************
 **/

// trigger router navigation via history
export function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE);
    yield history.push(pathname);
  }
}

export default {
  watchNavigate
};
