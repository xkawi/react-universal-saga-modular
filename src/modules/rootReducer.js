import { combineReducers } from 'redux';
import { errorMessage, router } from './common/reducers';
import { entities, pagination } from './github/reducers';

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  router
});

export default rootReducer;
