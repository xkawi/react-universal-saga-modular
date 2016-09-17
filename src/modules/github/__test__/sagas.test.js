import { select } from 'redux-saga/effects';
import { loadUser } from '../sagas';
import { getUser } from '../selectors';

describe('fetching user profile', () => {
  const username = 'xkawi';
  const generator = loadUser(username, []);
  let next = undefined;

  it('from local state', () => {
    next = generator.next();
    expect(next.value).toEqual(select(getUser, username)); // eslint-disable-line
  });

  it('skip fetching from github api', () => {
    next = generator.next(username);
    expect(next.value).toEqual(undefined); // eslint-disable-line
  });
});
