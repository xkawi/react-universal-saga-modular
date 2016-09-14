// import { take, put, call, select } from 'redux-saga/effects';

// import { loadLeads } from '../sagas';

// import { constants, listSagaActions } from '../actions';
// import { getLeadsQueryParams } from '../selectors';

// import { leadService } from 'services/api';
// import { fetchEntityList } from 'modules/common/sagas';

// export const fetchLeads = fetchEntityList.bind(null, listSagaActions, leadService.fetchLeads);

// const dummyQueryParams = { page: 1 };

// describe('fetching leads', () => {
//   const generator = loadLeads();
//   let next = undefined;
//   it('gets query params correctly', () => {
//     next = generator.next();
//     expect(next.value).toEqual(select(getLeadsQueryParams));
//   });

//   it('call bounded fetchLeads functions', () => {
//     next = generator.next(dummyQueryParams);
//     expect(JSON.stringify(next.value)).toBe(JSON.stringify(call(fetchLeads, dummyQueryParams)));
//   });

//   it('completed', () => {
//     next = generator.next();
//     expect(next.value).toBe(undefined);
//   });
// });
