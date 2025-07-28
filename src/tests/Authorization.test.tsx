import { render, RenderResult } from "@testing-library/react"
import redux from "react-redux"
import Authorization from "../components/auth/Authorization"
import axios, { AxiosResponse } from "axios"
import cooks from "../basefunction"
import { act } from "react"

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}))

jest.mock('axios', () => ({
    defaults: {
        baseUrl: '',
        headers: { common: {} }
    },
    interceptors: {
        response: {
            use: jest.fn()
        }
    },
    get: jest.fn(),
    request: jest.fn(),
    create: jest.fn(),
    default: jest.fn(),
}), { virtual: true })

interface Interceptors<T, E> {
    onFulfilled?: ((value: T) => T | Promise<T>),
    onRejected?: ((error: E) => E)

}


describe('Test Authorization middleware', () => {
    let component: RenderResult

    const mockTokenValue = 'token';
    const interceptors: Interceptors<AxiosResponse<unknown, unknown>, unknown> = {}

    const getRejectedData = (statusCode: number) => ({ response: { data: { statusCode: statusCode, data: 'Reject' } } })

    beforeEach(() => {
        jest.spyOn(redux, 'useSelector').mockReturnValue('mock-token')
        jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn)
        jest.spyOn(cooks, 'LogOut');
        jest.spyOn(cooks, 'getRefreshToken').mockImplementation(() => 'ref-token');
        jest.spyOn(cooks, 'setAccessToken');
        jest.spyOn(cooks, 'getJWT').mockReturnValue(mockTokenValue);
        jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({ message: 'Success' }));
        jest.spyOn(axios.interceptors.response, 'use').mockImplementation((onFulfilled, onRejected) => {
            expect(onFulfilled).toBeDefined()
            expect(onRejected).toBeDefined()
            if (onFulfilled && onRejected) {
                interceptors.onFulfilled = onFulfilled;
                interceptors.onRejected = onRejected;
            }
        })
        component = render(<Authorization />)
    })

    afterEach(() => {
        act(() => component.unmount())
    });

    it('Test set Authorization Bearer token', async () => {
        expect(axios.defaults.headers.common['Authorization']).toBe('Bearer mock-token')
    })
    it('Test response onFulfilled interceptor', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => interceptors.onFulfilled(responseData))

        const responseData = { message: 'Success' };
        const response = await axios.get('/some-endpoint')
        expect(response).toEqual(responseData)
    })

    it('Test response onRejected interceptor with 404 status code', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => interceptors.onRejected(rejectedData))

        const rejectedData = getRejectedData(404);
        const response = await axios.get('/some-endpoint')
        expect(response).toEqual(rejectedData.response.data)
    })

    it('Test response onRejected interceptor with 401 status code and successful updating access token', async () => {
        jest.spyOn(axios, 'get').mockImplementation((url: string) => {
            if (url.includes('refresh')) return Promise.resolve({ data: mockTokenValue })
            return interceptors.onRejected(getRejectedData(401)) as Promise<unknown>
        })

        const resolveData = { message: 'Success' };
        const response = await axios.get('/some-endpoint')
        act(() => {
            expect(cooks.getRefreshToken).toBeCalled()
            expect(cooks.setAccessToken).toBeCalledWith(mockTokenValue)
            expect(cooks.getJWT).toBeCalled()
            expect(cooks.LogOut).not.toBeCalled()
            expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${mockTokenValue}`)
            expect(response).toEqual(resolveData)
        })
    })

    it('Test response onRejected interceptor with 401 status code and rejected updating access token', async () => {
        jest.spyOn(axios, 'get').mockImplementation((url: string) => {
            if (url.includes('refresh')) return Promise.resolve({ data: null })
            return interceptors.onRejected(getRejectedData(401)) as Promise<unknown>
        })

        for (let i = 6; i > 0; i--) {
            (await axios.get('/some-endpoint'))
        }
        act(() => {
            expect(cooks.setAccessToken).not.toBeCalled()
            expect(cooks.getRefreshToken).toBeCalled()
            expect(cooks.getJWT).not.toBeCalled()
            expect(cooks.LogOut).toBeCalled()
        })
    })
})