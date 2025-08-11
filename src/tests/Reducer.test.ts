import { reducer, States } from '../store';
import { Filter } from '../types';

const actionsWithChangingFields: Record<string, object> = {
  Filter: {
    filter: 'Свежее',
    typeFilter: Filter.Tags,
  },
  SetJWT: { JWT: 'access-token' },
  DelJwt: { JWT: '' },
  setLocation: { location: '/post' },
  dropLocation: { location: '*' },
  setPage: { selectedPage: 10 },
  dropFilter: {
    filter: '',
    typeFilter: Filter.All,
  },
};
const storeFields = new Set(
  Object.values(actionsWithChangingFields)
    .map(item => Object.keys(item))
    .flat(2),
);

jest.mock('redux', () => ({
  createStore: jest.fn(),
}));

describe('Reducer', () => {
  const initState = reducer(...[, { type: '' }]);
  it('should setup default values in store when initial reducer', () => {
    storeFields.forEach(value =>
      expect(initState[value as keyof States]).toBeDefined(),
    );
  });

  it('should changed all field in store when called reducer actions without side effect', () => {
    expect(
      Object.keys(actionsWithChangingFields).every(actionType => {
        const state = reducer(initState, {
          type: actionType,
          ...actionsWithChangingFields[actionType],
        });
        return (
          JSON.stringify({
            ...initState,
            ...actionsWithChangingFields[actionType],
          }) === JSON.stringify(state)
        );
      }),
    ).not.toBeFalsy();
  });
});
