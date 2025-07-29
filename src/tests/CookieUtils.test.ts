import cooks from "../basefunction"

describe('Test Cookie Utils', () => {
    beforeEach(() => {
        Object.defineProperty(document, 'cookie', {
            value: {
                cookie: '',
            },
            writable: true,
        });
    });

    const { setCookie, getCookie, deleteCookie, getJWT, LogIn, LogOut, getRefreshToken, setAccessToken } = cooks;
    it('Test setCookie util', () => {
        const testValue = 'tokenStr'
        const testName = 'access-token'
        const testOptions = { path: '/api', expires: new Date(), httpOnly: true, secure: true, domain: 'test-domain.ru' }
        const resultValue = `access-token=tokenStr; path=/api; expires=${testOptions.expires.toUTCString()}; httpOnly; secure; domain=test-domain.ru`
        setCookie(testName, testValue, testOptions)
        expect(document.cookie).toBe(resultValue)
    })

    it('Test getCookie util', () => {
        const testValue = 'access-token=tokenStr; Path=/api; Expires=Wed, 27 Sep 2023 12:00:00 GMT; HttpOnly; Secure; Domain=test-domain.ru; refresh-token=refreshTokenStr; Path=/api; Expires=Wed, 27 Sep 2023 13:00:00 GMT; HttpOnly; Secure; Domain=test-domain.ru; session-id=sessionIdStr; Path=/; Expires=Wed, 27 Sep 2023 11:30:00 GMT; Domain=test-domain.ru'
        const resultValue = 'refreshTokenStr'
        document.cookie = testValue;
        expect(getCookie('refresh-token')).toBe(resultValue)
    })

    it('Test deleteCookie util', () => {
        const setCookie = jest.fn();
        deleteCookie.call({ setCookie },'refresh-token')
        expect(setCookie).toBeCalledWith('refresh-token', "", { 'max-age': -1 })
    })

    it('Test getJWT util', () => {
        const getCookie = jest.fn();
        getJWT.call({ getCookie })
        expect(getCookie).toBeCalledWith('access_token')
    })
    it('Test LogIn util', () => {
        const setCookie = jest.fn();
        LogIn.call({ setCookie }, 'acc-token', 'ref-token')
        expect(setCookie).toBeCalledWith('access_token', 'acc-token', { 'max-age': 3600 })
        expect(setCookie).toBeCalledWith('refresh_token', 'ref-token', { 'max-age': 864000 })
    })

    it('Test LogOut util', () => {
        const setCookie = jest.fn();
        LogOut.call({ setCookie })
        expect(setCookie).toBeCalledWith('access_token', '', { 'max-age': -1 })
        expect(setCookie).toBeCalledWith('refresh_token', '', { 'max-age': -1 })
    })

    it('Test getRefreshToken util', () => {
        const getCookie = jest.fn();
        getCookie.mockImplementationOnce(() => null)
        getCookie.mockImplementationOnce(() => 'token')
        expect(getRefreshToken.call({ getCookie })).not.toBeNull()
        expect(getRefreshToken.call({ getCookie })).toBe('token')
        expect(getCookie).toBeCalledWith('refresh_token')
    })

    it('Test setAccessToken util', () => {
        const setCookie = jest.fn();
        setAccessToken.call({ setCookie }, 'acc-token')
        expect(setCookie).toBeCalledWith('access_token', 'acc-token', { 'max-age': 3600 })
    })
})