import { createRequestTypes, action } from '../common/actions';

export const USER = createRequestTypes('USER');
export const REPO = createRequestTypes('REPO');
export const STARRED = createRequestTypes('STARRED');
export const STARGAZERS = createRequestTypes('STARGAZERS');

export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const LOAD_REPO_PAGE = 'LOAD_REPO_PAGE';
export const LOAD_MORE_STARRED = 'LOAD_MORE_STARRED';
export const LOAD_MORE_STARGAZERS = 'LOAD_MORE_STARGAZERS';

export const sagaActions = {
  user: {
    request: (login) => action(USER.REQUEST, { login }),
    success: (login, response) => action(USER.SUCCESS, { login, response }),
    failure: (login, error) => action(USER.FAILURE, { login, error }),
  },
  repo: {
    request: (fullName) => action(REPO.REQUEST, { fullName }),
    success: (fullName, response) => action(REPO.SUCCESS, { fullName, response }),
    failure: (fullName, error) => action(REPO.FAILURE, { fullName, error }),
  },
  starred: {
    request: (login) => action(STARRED.REQUEST, { login }),
    success: (login, response) => action(STARRED.SUCCESS, { login, response }),
    failure: (login, error) => action(STARRED.FAILURE, { login, error }),
  },
  stargazers: {
    request: (fullName) => action(STARGAZERS.REQUEST, { fullName }),
    success: (fullName, response) => action(STARGAZERS.SUCCESS, { fullName, response }),
    failure: (fullName, error) => action(STARGAZERS.FAILURE, { fullName, error }),
  }
};

export const viewActions = {
  loadUserPage: (login, requiredFields = []) => (
    action(LOAD_USER_PAGE, { login, requiredFields })
  ),
  loadRepoPage: (fullName, requiredFields = []) => (
    action(LOAD_REPO_PAGE, { fullName, requiredFields })
  ),
  loadMoreStarred: (login) => action(LOAD_MORE_STARRED, { login }),
  loadMoreStargazers: (fullName) => action(LOAD_MORE_STARGAZERS, { fullName })
};
