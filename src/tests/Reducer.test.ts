import { reducer } from "../store"
import { Filter } from "../types"

const actionsWithChangingFields: Record<string, object> = {
    'Filter': {
        'filter': 'Свежее',
        'typeFilter': Filter.Tags
    },
    'SetJWT': { 'JWT': 'access-token' },
    'DelJwt': { 'JWT': '' },
    'setLocation': { 'location': '/post' },
    'dropLocation': { 'location': '*' },
    'setPage': { 'selectedPage': 10 },
    'dropFilter': {
        'filter': '',
        'typeFilter': Filter.All
    },

}
const storeFields = new Set(Object.values(actionsWithChangingFields).map((item) => Object.keys(item)).flat(2))

jest.mock('redux', () => ({
    createStore: jest.fn()
}))

describe('Test reducer working in Redux store', () => {
    const initState = reducer(...[,{ type: ''}])
    it('Test reducer non nullable values default store ', () => {
        storeFields.forEach((value) => expect(initState[value]).toBeDefined())
    })

    it('Test all reducer actions', () => {
        expect(Object.keys(actionsWithChangingFields).every((actionType) => {
            const state = reducer(initState,{ type: actionType, ...actionsWithChangingFields[actionType] })
            return JSON.stringify({ ...initState, ...actionsWithChangingFields[actionType]}) === JSON.stringify(state)
        })).not.toBeFalsy()
    })
})