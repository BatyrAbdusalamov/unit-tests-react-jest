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

    const { setCookie, getCookie } = cooks;
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
})