import { act } from 'react';
import redux from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { render, RenderResult } from '@testing-library/react';

import Authorization from '../components/auth/Authorization';
import cooks from '../baseFunction';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock(
  'axios',
  () => ({
    defaults: {
      baseUrl: '',
      headers: { common: {} },
    },
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
    get: jest.fn(),
    request: jest.fn(),
    create: jest.fn(),
    default: jest.fn(),
  }),
  { virtual: true },
);

interface Interceptors<T, E> {
  onFulfilled?: (value: T) => T | Promise<T>;
  onRejected?: (error: E) => E;
}

describe('Authorization middleware', () => {
  let component: RenderResult;

  const HeaderTokenField = 'Authorization';

  const mockTokenValue = 'token';
  const mockStoreTokenValue = 'mock-token';
  const mockUri = '/some-endpoint';

  const mockResolveData = { message: 'Success' } as unknown as AxiosResponse<
    unknown,
    unknown
  >;

  const interceptors: Interceptors<AxiosResponse<unknown, unknown>, unknown> = {};

  const getRejectedData = (statusCode: number) => ({
    response: { data: { statusCode: statusCode, data: 'Reject' } },
  });

  beforeEach(() => {
    jest.spyOn(redux, 'useSelector').mockReturnValue(mockStoreTokenValue);
    jest.spyOn(redux, 'useDispatch').mockReturnValue(jest.fn);
    jest.spyOn(cooks, 'LogOut');
    jest.spyOn(cooks, 'getRefreshToken').mockImplementation(() => 'ref-token');
    jest.spyOn(cooks, 'setAccessToken');
    jest.spyOn(cooks, 'getJWT').mockReturnValue(mockTokenValue);
    jest
      .spyOn(axios, 'request')
      .mockImplementation(() => Promise.resolve(mockResolveData));
    jest
      .spyOn(axios.interceptors.response, 'use')
      .mockImplementation((onFulfilled, onRejected) => {
        expect(onFulfilled).toBeDefined();
        expect(onRejected).toBeDefined();
        if (onFulfilled && onRejected) {
          interceptors.onFulfilled = onFulfilled;
          interceptors.onRejected = onRejected;
        }
        return 0;
      });
    component = render(<Authorization />);
  });

  afterEach(() => {
    act(() => component.unmount());
  });

  it('should set Bearer token for header axios when mount component', async () => {
    expect(axios.defaults.headers.common[HeaderTokenField]).toBe(
      `Bearer ${mockStoreTokenValue}`,
    );
  });
  it('should return response without changes when successful request', async () => {
    jest
      .spyOn(axios, 'get')
      .mockImplementation(
        () => interceptors.onFulfilled?.(mockResolveData) as Promise<unknown>,
      );

    const response = await axios.get(mockUri);
    expect(response).toEqual(mockResolveData);
  });

  it('should return response when bad request in 404 status code', async () => {
    const rejectedData = getRejectedData(404);

    jest
      .spyOn(axios, 'get')
      .mockImplementation(
        () => interceptors.onRejected?.(rejectedData) as Promise<unknown>,
      );

    const response = await axios.get(mockUri);
    expect(response).toEqual(rejectedData.response.data);
  });

  it('should updated access token and repeat the request with new token when bad request in 401 status code', async () => {
    jest.spyOn(axios, 'get').mockImplementation((url: string) => {
      if (url.includes('refresh')) return Promise.resolve({ data: mockTokenValue });
      return interceptors.onRejected?.(getRejectedData(401)) as Promise<unknown>;
    });

    const response = await axios.get(mockUri);
    act(() => {
      expect(cooks.getRefreshToken).toBeCalled();
      expect(cooks.setAccessToken).toBeCalledWith(mockTokenValue);
      expect(cooks.getJWT).toBeCalled();
      expect(cooks.LogOut).not.toBeCalled();
      expect(axios.defaults.headers.common[HeaderTokenField]).toBe(
        `Bearer ${mockTokenValue}`,
      );
      expect(response).toEqual(mockResolveData);
    });
  });

  it('should log out when repeat request more than 5 times in 401 status code', async () => {
    jest.spyOn(axios, 'get').mockImplementation((url: string) => {
      if (url.includes('refresh')) return Promise.resolve({ data: null });
      return interceptors.onRejected?.(getRejectedData(401)) as Promise<unknown>;
    });

    for (let i = 6; i > 0; i--) {
      await axios.get(mockUri);
    }
    act(() => {
      expect(cooks.setAccessToken).not.toBeCalled();
      expect(cooks.getRefreshToken).toBeCalled();
      expect(cooks.getJWT).not.toBeCalled();
      expect(cooks.LogOut).toBeCalled();
    });
  });
});
