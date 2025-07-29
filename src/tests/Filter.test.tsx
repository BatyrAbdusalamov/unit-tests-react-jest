import { fireEvent, render } from "@testing-library/react"
import FilterComponent from "../components/header/filter/filter"
import { Filter as filteres } from '../types';
import { Action } from "redux";
import { useDispatch } from "react-redux";
interface FilterStore { filter: string | null, typeFilter: string | null}
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));
describe('Test Filter component', () => {

    let store: FilterStore = {
        filter: null,
        typeFilter: null
    };

    const mockDispatch = (action: any) => {store = action};

    beforeEach(() => {
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    })

    it('Test onChange input', () => {
        const Filter = render(<FilterComponent/>)
        const testValue = 'Свежее'
        const input = Filter.container.querySelector('input')
        expect(input).toBeDefined()
        fireEvent.change(input, { target: { value: testValue } })
        expect(store.filter).toBe(testValue)
    })

    it('Test onChange select', () => {
        const Filter = render(<FilterComponent/>)
        const testValue = filteres.All
        const option = Filter.container.querySelector(`[value="${testValue}"]`)
        const select = Filter.container.querySelector(`[name="typeFilter"]`)
        expect(option).toBeDefined()
        fireEvent.click(option)
        expect(store.typeFilter).toBe(testValue)
    })
    
})