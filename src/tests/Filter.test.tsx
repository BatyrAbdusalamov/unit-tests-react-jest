import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import FilterComponent from '../components/header/filter/filter';
import { Filter as filteres } from '../types';
interface FilterStore {
  filter: string | null;
  typeFilter: string | null;
}
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
describe('Filter component', () => {
  let store: FilterStore = {
    filter: null,
    typeFilter: null,
  };

  const mockDispatch = (action: any) => {
    store = action;
  };

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should changed field filter in store when to be changing input', () => {
    const Filter = render(<FilterComponent />);
    const testValue = 'Свежее';
    const input = Filter.container.querySelector('input');
    expect(input).toBeDefined();
    fireEvent.change(input as NonNullable<Element>, {
      target: { value: testValue },
    });
    expect(store.filter).toBe(testValue);
  });

  it('should changed field typeFilter in store when to be changing select', () => {
    const Filter = render(<FilterComponent />);
    const testValue = filteres.All;
    const option = Filter.container.querySelector(`[value="${testValue}"]`);
    expect(option).toBeDefined();
    fireEvent.click(option as NonNullable<Element>);
    expect(store.typeFilter).toBe(testValue);
  });
});
