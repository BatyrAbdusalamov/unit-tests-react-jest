import cooks from '../baseFunction';

describe('Cookie Utils', () => {
  const RefreshTokenField = 'refresh_token';
  const AccessTokenField = 'access_token';

  const mockRefreshTokenValue = 'ref-token';
  const mockAccessTokenValue = 'acc-token';

  const mockDeleteOptionsCookie = { 'max-age': -1 };

  beforeEach(() => {
    Object.defineProperty(document, 'cookie', {
      value: {
        cookie: '',
      },
      writable: true,
    });
  });

  const {
    setCookie,
    getCookie,
    deleteCookie,
    getJWT,
    LogIn,
    LogOut,
    getRefreshToken,
    setAccessToken,
  } = cooks;
  describe('setCookie util', () => {
    const testOptions = {
      path: '/api',
      expires: new Date(),
      secure: true,
      domain: 'test-domain.ru',
    };
    it('should set cookie with the necessary parameters', () => {
      const resultValue = `${AccessTokenField}=${mockAccessTokenValue}; path=/api; expires=${testOptions.expires.toUTCString()}; secure; domain=test-domain.ru`;
      setCookie(AccessTokenField, mockAccessTokenValue, testOptions);
      expect(document.cookie).toBe(resultValue);
    });

    it('should set cookie with the not parameters', () => {
      const resultValue = `${AccessTokenField}=${mockAccessTokenValue}; path=/`;
      setCookie(AccessTokenField, mockAccessTokenValue);
      expect(document.cookie).toBe(resultValue);
    });

    it('should throw an error when the key is empty', () => {
      expect(() => setCookie('', mockAccessTokenValue, testOptions)).toThrowError();
    });
  });

  describe('getCookie util', () => {
    it('should get necessary cookie', () => {
      const testValue = `${AccessTokenField}=${mockAccessTokenValue}; Path=/api; Expires=Wed, 27 Sep 2023 12:00:00 GMT; Secure; Domain=test-domain.ru; ${RefreshTokenField}=${mockRefreshTokenValue}; Path=/api; Expires=Wed, 27 Sep 2023 13:00:00 GMT; HttpOnly; Secure; Domain=test-domain.ru; session-id=sessionIdStr; Path=/; Expires=Wed, 27 Sep 2023 11:30:00 GMT; Domain=test-domain.ru`;
      document.cookie = testValue;
      expect(getCookie(RefreshTokenField)).toBe(mockRefreshTokenValue);
    });
  });

  describe('deleteCookie util', () => {
    it('should called setCookie with option "max-age=-1" when delete necessary cookie', () => {
      const setCookie = jest.fn();
      deleteCookie.call({ setCookie }, RefreshTokenField);
      expect(setCookie).toBeCalledWith(
        RefreshTokenField,
        '',
        mockDeleteOptionsCookie,
      );
    });
  });

  describe('getJWT util', () => {
    it(`should called getCookie with key "${AccessTokenField}" when get jwt token`, () => {
      const getCookie = jest.fn();
      getJWT.call({ getCookie });
      expect(getCookie).toBeCalledWith(AccessTokenField);
    });
  });

  describe('LogIn util', () => {
    const setCookie = jest.fn();

    beforeEach(() => {
      LogIn.call({ setCookie }, mockAccessTokenValue, mockAccessTokenValue);
    });
    it(`should called setCookie with key "${AccessTokenField}" and option "max-age=3600" when log in`, () => {
      expect(setCookie).toBeCalledWith(AccessTokenField, mockAccessTokenValue, {
        'max-age': 3600,
      });
    });
    it(`should called setCookie with key "${RefreshTokenField}" and option "max-age=864000" when log in`, () => {
      expect(setCookie).toBeCalledWith(RefreshTokenField, mockAccessTokenValue, {
        'max-age': 864000,
      });
    });
  });

  describe('LogOut util', () => {
    const setCookie = jest.fn();
    beforeEach(() => {
      LogOut.call({ setCookie });
    });
    it('should called setCookie for access-token cookie with empty string and option "max-age=-1" when log out', () => {
      expect(setCookie).toBeCalledWith(
        AccessTokenField,
        '',
        mockDeleteOptionsCookie,
      );
    });
    it('should called setCookie for refresh-token cookie with empty string and option "max-age=-1" when log out', () => {
      expect(setCookie).toBeCalledWith(
        RefreshTokenField,
        '',
        mockDeleteOptionsCookie,
      );
    });
  });

  describe('getRefreshToken util', () => {
    const mockValue = 'token';
    const getCookie = jest.fn();
    it('should return empty string and called getCookie for refresh-token cookie when get refresh token', () => {
      getCookie.mockImplementationOnce(() => null);
      expect(getRefreshToken.call({ getCookie })).toBe('');
      expect(getCookie).toBeCalledWith(RefreshTokenField);
    });
    it('should return token value and called getCookie for refresh-token cookie when get refresh token', () => {
      getCookie.mockImplementationOnce(() => mockValue);
      expect(getRefreshToken.call({ getCookie })).toBe(mockValue);
      expect(getCookie).toBeCalledWith(RefreshTokenField);
    });
  });

  describe('setAccessToken util', () => {
    it(`should called setCookie for ${AccessTokenField} cookie with value ${mockAccessTokenValue} and option "max-age=3600 when set access token"`, () => {
      const setCookie = jest.fn();
      setAccessToken.call({ setCookie }, mockAccessTokenValue);
      expect(setCookie).toBeCalledWith(AccessTokenField, mockAccessTokenValue, {
        'max-age': 3600,
      });
    });
  });
});
