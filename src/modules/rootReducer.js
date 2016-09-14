import { combineReducers } from 'redux';
import { entities, pagination, errorMessage, router } from './github/reducers';

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  router
});

export default rootReducer;
