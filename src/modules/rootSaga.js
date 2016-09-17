import { fork, join } from 'redux-saga/effects';

// IMPORT ALL SAGA WATCHERS
import {
  watchNavigate
} from './common/sagas';
import {
  watchLoadUserPage,
  watchLoadRepoPage,
  watchLoadMoreStargazers,
  watchLoadMoreStarred
} from './github/sagas';

// CUSTOM METHOD FOR USAGE AT server.js TO RUN SAGAS ON SERVER SIDE (e.g. fetch data)
export const waitAll = (sagas) => function* genTasks() {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params));
  yield tasks.map(join);
};

// CONSOLIDATE AND EXPORT ALL SAGAS
export default function* rootSaga() {
  yield [
    fork(watchNavigate),
    fork(watchLoadUserPage),
    fork(watchLoadRepoPage),
    fork(watchLoadMoreStarred),
    fork(watchLoadMoreStargazers)
  ];
}
